// fetching from external API company details
export async function fetchCompanyDatiles() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch users.");
    }
}
