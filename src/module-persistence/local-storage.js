export function get (key){
    return localStorage.getItem(key);
}
export function put (key, value){
    localStorage.setItem(key, value);
}