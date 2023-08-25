import React, { useState } from "react";
import { IonAlert } from "@ionic/react";

const useConfirmationAlert = () => {
  const [showAlert, setShowAlert] = useState(false); // Estado que controla se o alerta está visível
  const [alertMessage, setAlertMessage] = useState(""); // Mensagem exibida no alerta
  const [confirmAction, setConfirmAction] = useState<() => void>(); // Função a ser executada ao confirmar o alerta

  // Função para exibir o alerta de confirmação
  const showConfirmationAlert = (
    message: React.SetStateAction<string>,
    onConfirm: () => void
  ) => {
    setAlertMessage(message); // Define a mensagem do alerta
    setConfirmAction(() => onConfirm); // Define a função de confirmação
    setShowAlert(true); // Exibe o alerta
  };

  // Função para lidar com a ação de confirmação
  const handleConfirm = () => {
    confirmAction && confirmAction(); // Executa a função de confirmação, se existir
    setShowAlert(false); // Fecha o alerta
  };

  // Função para lidar com o cancelamento do alerta
  const handleCancel = () => {
    setShowAlert(false); // Fecha o alerta
  };

  return {
    showConfirmationAlert, // Função para exibir o alerta de confirmação
    ConfirmationAlert: (
      <IonAlert
        isOpen={showAlert} // Define se o alerta está visível
        message={alertMessage} // Define a mensagem do alerta
        buttons={[
          {
            text: "Cancelar",
            role: "cancelar",
            handler: handleCancel,
          },
          {
            text: "Confirmar",
            handler: handleConfirm,
          },
        ]} // Define os botões do alerta com suas ações
      />
    ), // Retorna o componente de alerta configurado
  };
};

export default useConfirmationAlert;
