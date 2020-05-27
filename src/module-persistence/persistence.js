
export function Persistence() {
    this.get = (key) => {
        console.log("get " + localStorage.getItem(key));
        return localStorage.getItem(key);
    }
    this.put = (key, value) => {
        console.log("put " + localStorage.setItem(key, value));
        localStorage.setItem(key, value);
     }
}