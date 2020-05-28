
export function Persistence() {
    this.get = (key) => {
        return localStorage.getItem(key);
    }
    this.put = (key, value) => {
        localStorage.setItem(key, value);
     }
}