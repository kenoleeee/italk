function OutlineButton({ text, ...props }) {
    return (
      <button className="bg-transparent border-1 border-accent text-white px-4 py-2 rounded-2xl
      cursor-pointer hover:bg-accent hover:text-white" {...props}>
        {text}
      </button>
    )
  }
  
  export default OutlineButton