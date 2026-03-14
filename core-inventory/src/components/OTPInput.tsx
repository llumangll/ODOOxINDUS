import React, { useRef, useState, useEffect } from 'react';
import { cn } from './InputField';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  error?: boolean;
}

export function OTPInput({ length = 6, value, onChange, error }: OTPInputProps) {
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value.length < length) {
      inputRefs.current[value.length]?.focus();
      setActiveInput(value.length);
    } else {
      inputRefs.current[length - 1]?.focus();
      setActiveInput(length - 1);
    }
  }, []);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    let newValue = value.split('');
    newValue[index] = val.substring(val.length - 1);
    const result = newValue.join('');
    
    onChange(result);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        onChange(value.slice(0, -1));
        inputRefs.current[index - 1]?.focus();
        setActiveInput(index - 1);
      } else {
        let newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length).replace(/[^\d]/g, '');
    if (pastedData) {
      onChange(pastedData);
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      setActiveInput(nextIndex);
    }
  };

  return (
    <div className="flex justify-between gap-2 sm:gap-4 w-full" onPaste={handlePaste}>
      {Array.from({ length }, (_, index) => (
        <div key={index} className="relative w-10 sm:w-12 h-14">
          <input
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={value[index] || ''}
            onChange={(e) => changeValue(e, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            onFocus={() => setActiveInput(index)}
            className={cn(
              "w-full h-full absolute inset-0 text-center font-bold text-lg bg-white/[0.05] border rounded-lg focus:outline-none transition-all",
              "border-white/[0.1] text-white",
              error ? "border-red-500 focus:ring-red-500/50" : "focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50",
              activeInput === index && !error ? "border-teal-500/80 shadow-[0_0_10px_rgba(20,184,166,0.3)]" : ""
            )}
            autoComplete="off"
          />
        </div>
      ))}
    </div>
  );
}
