import React, { useEffect, useRef } from 'react'
import './CheckBox.scss'

export const CheckBox = (props) => {
    const {id, onCheck, onUnCheck, isChecked, color} = props

    const myCheckBox = useRef(null)

    useEffect(()=>{
      if(isChecked) {
        myCheckBox.current.checked= true
      } else {
        myCheckBox.current.checked= false
      }
    },[isChecked])

    const handleChangeCheckBox = (e) => {
      if  (e.target.checked) {
        onCheck()
      } else {
        onUnCheck()
      }
    }
    

  return (
    <div className='my-check-box'>
        <input type="checkbox" id={id} onChange={handleChangeCheckBox} ref={myCheckBox}/>
        {color && <label htmlFor={id} className="color" style={{'--color':color}}>
                <i class="fa fa-check"></i>
            {/* <span className="check-mark">
            </span> */}
        </label>}
        {!color && <label htmlFor={id} >
                <i class="fa fa-check"></i>
            {/* <span className="check-mark">
            </span> */}
        </label>}
    </div>
  )
}
