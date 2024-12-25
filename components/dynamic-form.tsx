"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { DateTimePicker } from "./ui/datetime-picker"

interface DynamicFormProps<T extends z.ZodType<any, any>> {
  schema: T
  onSubmit: (data: z.infer<T>) => void
  submitText?: string
  redirectUrl?: string
}

export function DynamicForm<T extends z.ZodType<any, any>>({
  schema,
  onSubmit,
  submitText = "Submit",
  redirectUrl = "",
}: DynamicFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: {} as z.infer<T>,
  })
  const { user } = useAuth()

  const [formData, setFormData] = useState<z.infer<T> | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (data: z.infer<T>) => {
    setFormData(data)
    onSubmit(data)
    if (redirectUrl) {
      router.push(redirectUrl)
    }
  }

  form.setValue("uid", user?.id)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {Object.entries(schema.shape).map(([key, value]) => {
          const fieldConfig = value as z.ZodType<any>
          if (key.toLowerCase().endsWith("id")) {
            return (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem className="grid grid-flow-row gap-1">
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )
          }
          return (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field }) => (
                <FormItem className="grid grid-flow-row gap-1">
                  <FormLabel>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </FormLabel>
                  <FormControl>
                    {fieldConfig instanceof z.ZodBoolean ? (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    ) : fieldConfig instanceof z.ZodNumber ? (
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    ) : fieldConfig instanceof z.ZodString &&
                      key.toLowerCase().includes("password") ? (
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOffIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <EyeIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    ) : fieldConfig instanceof z.ZodString &&
                      fieldConfig._def.maxLength?.value ? (
                      <Textarea {...field} />
                    ) : fieldConfig instanceof z.ZodDate ? (
                      <DateTimePicker
                        hideTime
                        {...field}
                        onChange={(date) => field.onChange(date)}
                      />
                    ) : fieldConfig instanceof z.ZodArray &&
                      fieldConfig._def.type instanceof z.ZodNativeEnum ? (
                      <Controller
                        name={key}
                        control={form.control}
                        render={({ field: { onChange, value } }) => (
                          <div className="flex flex-col space-y-2">
                            {Object.values(
                              fieldConfig._def.type._def.values
                            ).map((option) => (
                              <div
                                key={option}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${key}-${option}`}
                                  checked={(value as string[])?.includes(
                                    option
                                  )}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...((value as string[]) || []), option]
                                      : (value as string[])?.filter(
                                          (item) => item !== option
                                        )
                                    onChange(updatedValue)
                                  }}
                                />
                                <label
                                  htmlFor={`${key}-${option}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    ) : fieldConfig instanceof z.ZodNativeEnum ? (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {Object.values(fieldConfig._def.values).map((value) => (
                          <FormItem
                            key={value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {value.charAt(0).toUpperCase() + value.slice(1)}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    ) : (
                      <Input {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}
        <Button type="submit" className="w-full">
          {submitText}
        </Button>
      </form>
    </Form>
  )
}
