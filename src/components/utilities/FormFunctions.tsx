export const setValue = (key: string, value: any, state: any, updateState: Function) => {
    updateState({ ...state, [key]: value })
}