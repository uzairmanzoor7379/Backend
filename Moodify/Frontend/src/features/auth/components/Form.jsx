const Form = ({label , type ,value ,set}) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
          <input required onChange={(e)=>{set(e.target.value)}}
          type={type} id={label} placeholder='' value={value} />
    </div>
  )
}

export default Form

