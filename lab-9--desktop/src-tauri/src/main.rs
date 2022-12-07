#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate mac_address;
use mac_address::get_mac_address;

#[tauri::command]
fn get_mac_addr() -> String {
    match get_mac_address() {
        Ok(Some(ma)) => ma.to_string(),
        Ok(_) => String::new(),
        Err(_) => String::new(),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_mac_addr])
        // .invoke_handler(tauri::generate_handler![get_mac_addr])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
