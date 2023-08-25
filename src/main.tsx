import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { Capacitor } from "@capacitor/core";
import {
  CapacitorSQLite,
  SQLiteConnection,
} from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";


window.addEventListener("DOMContentLoaded", async () => {
  try {
    const platform = Capacitor.getPlatform();


    // Funcionalidade Web
    if (platform === "web") {
      const sqlite = new SQLiteConnection(CapacitorSQLite);
      // Cria o componente jeep-sqlite
      customElements.define("jeep-sqlite", JeepSqlite);
      const jeepSqliteEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepSqliteEl);
      await customElements.whenDefined("jeep-sqlite");
      console.log(`after customElements.whenDefined`);

      // Inicializa a Web
      await sqlite.initWebStore();
      console.log(`after initWebStore`);
    }

    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (e) {
    console.log(e);
  }
});