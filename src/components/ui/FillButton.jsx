function FillButton({ text, ...props }) {
  return (
    <button className="bg-accent text-white px-4 py-2 rounded-2xl
    cursor-pointer hover:bg-transparent hover:border-1 hover:border-accent" {...props}>
      {text}
    </button>
  )
}

export default FillButton