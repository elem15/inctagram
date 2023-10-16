export const consoleErrors = (error: Error) => {
  if ('data' in error) {
    const errMsg = error.data as ErrorDataType

    if ('messages' in errMsg) {
      console.error(errMsg.messages)
    } else {
      console.error(JSON.stringify(errMsg))
    }
  } else {
    console.error(JSON.stringify(error))
  }
}
