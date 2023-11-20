import { IonInput } from "@ionic/react"
import React from "react"

type propsType = {
    texto: string,
    tipo: any,
    change: any
}

const InputTexto = (props: propsType) => {
    return (
        <IonInput placeholder={props.texto} type={props.tipo} onIonChange={props.change}></IonInput>
    )
}

export default InputTexto