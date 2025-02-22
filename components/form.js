import {validateForm} from "../utils/validation.js";
import {fetchCompanyDatiles} from "../services/api.js"

export class Form {
    constructor() {
        this.form = document.createElement("form");
        this.form.innerHTML = `
            <form>
           <h4 class="mb-4">Organization Information</h4>
                <hr class="mb-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="companyName">Company Name</label>
                        <input type="text" id="companyName" name="companyName"
                            class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2">
                        <span id="companyNameError" class="error text-red-500 text-xs"></span>
                    </div>
                    <div>
                        <label for="crNumber">Commercial Registration Number</label>
                        <input type="number" id="crNumber" name="crNumber"
                            class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2">
                        <span id="crNumberError" class="error text-red-500 text-xs"></span>
                    </div>
                    <div>
                        <label for="businessType">Business Type</label>
                        <select id="businessType" name="businessType"
                            class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2">
                            <option value="">Select Type</option>
                            <option value="sole">Sole Proprietorship</option>
                            <option value="partnership">Partnership</option>
                            <option value="llc">Limited Liability Company (LLC)</option>
                            <option value="corporation">Corporation</option>
                        </select>
                        <span id="businessTypeError" class="error text-red-500 text-xs"></span>
                    </div>
                </div>

                <h4 class="my-4">Owner Information</h4>
                <hr class="mb-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="email">Email</label>
                        <input type="text" id="email" name="email"
                            class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2">
                        <span id="emailError" class="error text-red-500 text-xs"></span>
                    </div>
                    <div>
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone"
                            class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2">
                        <span id="phoneError" class="error text-red-500 text-xs"></span>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password"
                            class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2">
                        <span id="passwordError" class="error text-red-500 text-xs"></span>
                    </div>
                    <div>
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword"
                            class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2">
                        <span id="confirmPasswordError" class="error text-red-500 text-xs"></span>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                        <label for="city">City</label>
                        <input type="text" id="city" name="city" class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2"
                            >
                        <span id="cityError" class="error text-red-500 text-xs"></span>
                    </div>
                    <div>
                        <label for="region">Region</label>
                        <input type="text" id="region" name="region" class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2"
                            >
                        <span id="regionError" class="error text-red-500 text-xs"></span>
                    </div>
                    <div>
                        <label for="zip">Zip Code</label>
                        <input type="text" id="zip" name="zip" class="focus:outline-none focus:ring-2 focus:ring-gray-500 p-2"
                            >
                        <span id="zipError" class="error text-red-500 text-xs"></span>
                    </div>
                </div>

                <div class="form-check my-5">
                    <input class="form-check-input" type="checkbox" id="checkbox">
                    <label class="form-check-label py-0" for="checkbox">
                        I agree to the <a href="#">Terms & Conditions</a>
                    </label>
                    <span id="checkboxError" class="error text-red-500 text-xs"></span>
                </div>
                <hr>
                <div class="flex justify-end" id="buttonDiv">
                    <button type="submit" class="px-6 py-2 bg-green-600 text-white rounded-md mr-3">Submit</button>
                </div>
                 </form>
        `;

        this.form.addEventListener("submit", this.handleSubmission.bind(this));
    }


    handleSubmission = async (event) => {
        event.preventDefault(); 
        const companyName = document.getElementById("companyName").value.trim();
        const crNumber = document.getElementById("crNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const city = document.getElementById("city").value.trim();
        const region = document.getElementById("region").value.trim();
        const zip = document.getElementById("zip").value.trim();
        const businessType = document.getElementById("businessType").value;
        const terms = document.getElementById("checkbox").checked;

        const errors = validateForm(companyName, crNumber, email, phone, password, confirmPassword, city, region, zip, businessType, terms);

        document.getElementById("companyNameError").textContent = errors.companyName || "";
        document.getElementById("crNumberError").textContent = errors.crNumber || "";
        document.getElementById("phoneError").textContent = errors.phone || "";
        document.getElementById("cityError").textContent = errors.city || "";
        document.getElementById("regionError").textContent = errors.region || "";
        document.getElementById("zipError").textContent = errors.zip || "";
        document.getElementById("businessTypeError").textContent = errors.businessType || "";
        document.getElementById("checkboxError").textContent = errors.terms || "";
        document.getElementById("emailError").textContent = errors.email || "";
        document.getElementById("passwordError").textContent = errors.password || "";
        document.getElementById("confirmPasswordError").textContent = errors.confirmPassword || "";
        
        const data = {companyName, crNumber, email, phone, password, confirmPassword, city, region, zip, businessType};
        
        if (!errors.companyName && !errors.crNumber && !errors.phone && !errors.city && !errors.region && !errors.zip && !errors.businessType && !errors.terms && !errors.email && !errors.password && !errors.confirmPassword) {
            try {
                
                const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                
                if (response.ok) {
                    const result = await response.json();
                    alert("Registration successful!");
                    let name = companyName;
                    let cr = crNumber
                    let bt = businessType
                    let pass = password
                    let cp = confirmPassword
                    let reg = region
                    clear();
                    const fetchData = document.getElementById('buttonDiv');
                    let fetchButt = document.createElement('button');
                    fetchButt.innerText = 'Retrieve';
                    fetchButt.type = 'button'
                    fetchButt.classList.add('custom-button')
                    fetchButt.onclick = async() => {
                        await fetchCompanyDatiles().then(
                            data =>
                                data.forEach(user => {
                                    if (user.company.name === name){
                                    document.getElementById('companyName').value = user.company.name
                                    document.getElementById('email').value = user.email
                                    document.getElementById('phone').value = user.phone
                                    document.getElementById('city').value = user.address.city
                                    document.getElementById('zip').value = user.address.zip
                                    document.getElementById("crNumber").value = cr
                                    document.getElementById("region").value = reg
                                    document.getElementById("businessType").value = bt
                                    document.getElementById("checkbox").checked = true
                                    document.getElementById("password").value = pass;
                                    document.getElementById("confirmPassword").value = cp;
                                    }
                                }
                                )
    
                        )
                    }

                    fetchData.appendChild(fetchButt);
                    console.log(`Success: ${result.message}`);
                } else {
                    throw new Error('Something went wrong');
                }
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }


        function clear() {
            document.getElementById("companyName").value = "";
            document.getElementById("crNumber").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("city").value = "";
            document.getElementById("region").value = "";
            document.getElementById("zip").value = "";
            document.getElementById("businessType").value = "";
            document.getElementById("checkbox").checked = false;
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("confirmPassword").value = "";
        }
    }

    render(parent) {
        parent.appendChild(this.form);
    }
}