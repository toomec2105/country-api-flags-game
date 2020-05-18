export async function getAPIDataAsJsObjects(url) {
    try {
        const response = await fetch(url);
        const countryArray = await response.json();
        //console.log(countryArray);
        return countryArray;
    }
    catch (error) {
        console.log(error);
    }
}
