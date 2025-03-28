"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  className?: string
  min?: number
  max?: number
  step?: number
  value?: number | number[]
  defaultValue?: number | number[]
  onValueChange?: (value: number | number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, defaultValue, value, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<number | number[]>(
      value !== undefined ? value : defaultValue !== undefined ? defaultValue : min
    )

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const getPercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      setInternalValue(newValue)
      
      if (onValueChange) {
        onValueChange(newValue)
      }
    }

    let currentValue = 0;
    if (typeof internalValue === 'number') {
      currentValue = internalValue;
    } else if (Array.isArray(internalValue) && internalValue.length > 0) {
      currentValue = internalValue[0];
    }
    
    const percentage = getPercentage(currentValue);

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <div className="relative h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div 
            className="absolute h-full rounded-full bg-neutral-900 dark:bg-neutral-50" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Slider.displayName = "Slider"

export { Slider } 