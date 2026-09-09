import type { ButtonProps } from "../types/button.types";

export const Button = (props: ButtonProps) => { 
  return (
    <>
      <button 
        {...props}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded" 
      >
        {props?.children || ''}
      </button>
    </>
  );
} 