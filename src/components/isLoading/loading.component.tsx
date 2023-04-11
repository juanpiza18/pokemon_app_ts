import React from "react";
import Spinner from "../spinner/spinner.component";

interface IsLoadingProps {
    isLoading: boolean;
}

const IsLoading = ({isLoading, children}: React.PropsWithChildren<IsLoadingProps>) => {
    return (
    <>
     {isLoading ?  <Spinner /> : <>{children}</>}
    </>)
} 

export default IsLoading; 