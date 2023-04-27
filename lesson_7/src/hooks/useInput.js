import useLocalStorage from './useLocalStorage'

const useInput = (key, initValue) => {

   // functions("value" and "setValue") returned from "useLocalStorage" hook is now bound to "value" and "setValue"
   const [value, setValue] = useLocalStorage(key, initValue)

   const reset = () => setValue(initValue)

   const attributeObj = {
      value,
      onChange: (e) => setValue(e.target.value)
   }

   return [value, reset, attributeObj]
}

export default useInput