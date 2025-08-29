 export const Button = ({children,onClick,type='button',variant='primary',disabled=false,className=""})=>{

  const baseStyle = "px-4 py-2 font-medium rounded-full border-2 transition-colors duration-200";
  const variants = {
  primary: "text-black ",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  return(
  <button type={type} onClick={onClick} disabled={disabled} className={` ${className} ${baseStyle} ${variants[variant]}  ${ disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
   {children}
  </button>
  )
 }