import { useDispatch, useSelector } from "react-redux"
import { TypedUseSelectorHook } from "react-redux"
import { AppDispatch, RootState } from "./store"


// create cooks that are bind to our interface we set
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector