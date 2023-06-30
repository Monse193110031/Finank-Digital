import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = "https://tuqucrxjlntjlgfwzcjf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1cXVjcnhqbG50amxnZnd6Y2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MzA1OTksImV4cCI6MTk5ODIwNjU5OX0.4o4Nx9oQHh9QDwoJ1X4eiv2J_eL71yuHGlOv2GRny7c";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function handleFileUpload(event) {
  const file = event.target.files[0];
  const fileId = uuidv4();
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`my-folder/${fileId}`, file, {
      cacheControl: "3600",
      upsert: true,
    });
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

export async function createUser(client) {
  const { data, error } = await supabase
    .from("Cliente")
    .insert([client])
    .select();
  console.log(data, error);
  return data[0];
}

export async function createBankAccount(account) {
  const { data, error } = await supabase
    .from("CuentaBancaria")
    .insert([account]);
  return data;
}

export async function getBankAccounts() {
  const { data, error } = await supabase.from("CuentaBancaria").select(`
  idCuentaBancaria,
  numeroCuenta,
  saldo,
  Cliente(idCliente,nombre)
  `);
  return data;
}

export async function getBankAccountsClients() {
  const { data, error } = await supabase.from("CuentaBancaria").select(`
  idCuentaBacaria,
  numeroCuenta,
  saldo,
  Cliente(idCliente,nombre)
  `);
  return data;
}

//updateBankAccount
export async function updateBankAccount(account) {
  const { ammount, id } = account;
  const tableName = "CuentaBancaria";
  const updatedValues = { saldo: ammount };
  console.log(account);
  const filter = { idCuentaBancaria: id }; // Ejemplo de filtro por ID

  const { data, error } = await supabase
    .from(tableName)
    .update(updatedValues)
    .eq("idCuentaBancaria", id);

  if (error) {
    console.error("Error al actualizar el registro:", error, updatedValues);
    return;
  }

  console.log("Registro actualizado correctamente:", data);
}
//deleteBankAccount
export async function deleteAccount(account) {
  const { id } = account;
  const { data, error } = await supabase
    .from("CuentaBancaria")
    .delete()
    .eq("idCuentaBancaria", id);

  if (error) {
    console.error("Error al eliminar el registro:", error);
    return;
  }

  console.log("Registro eliminado correctamente:", data);
}
//getClientBankAccounts
