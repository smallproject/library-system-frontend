import "./Card.css";
import "../../App.css";
import React, {useState} from "react";
import axios from "axios";
import getTodayDate from "../../helpers/getExpiryDate.js";

function CardCreateView() {
    const [createInventory, setCreateInventory] = React.useState(false);
    const [formInventory, setFormInventory] = useState({
        location: "",
        condition: "",
        acquisitionMethod: "",
        supplier: "",
        lastInventoryCheck: getTodayDate(),
        borrowCount: 0,
        borrowedStatus: "",
        reserveStatus: "",
        replacementCost: "",
        edition: "",
        publisher: "",
        notes: "",
        barcode: "",
        restockDate: "",
        timesLost: 0,
        circulationStatus: "",
        purchaseDate: getTodayDate(),
        isbn: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post("http://localhost:8080/api/v1/inventories",
                formInventory,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Add the token here
                    },
                });

            alert("Inventory is created successfully!");
            setCreateInventory(true);
        } catch (e) {
            console.error(e);
            alert("Failed to create the inventory.");
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormInventory({
            ...formInventory,
            [name]: value
        });
    };

    return (
        <section className={"container"}>
            <article className={"plain-text-container create-container container"}>
                <h2 className={"header"}>Create a new inventory</h2>
                <form onSubmit={handleSubmit} className={"form-container"}>
                    {createInventory && <p className={"confirm-info-create"}>Inventory has been created</p>}
                    <div className={"inputGroup"}>
                        <label htmlFor="location" className={"label"}>
                            Location:
                        </label>
                        <input
                            type="text"
                            id={"location"}
                            name={"location"}
                            value={formInventory.location}
                            onChange={handleChange}
                            placeholder={"Enter location"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="condition" className={"label"}>
                            Condition:
                        </label>
                        <input
                            type="text"
                            id={"condition"}
                            name={"condition"}
                            value={formInventory.condition}
                            onChange={handleChange}
                            placeholder={"Enter condition"}
                            required
                            className={"input"}
                        />
                    </div>
                    <div className={"inputGroup"}>
                        <label htmlFor="acquisitionMethod" className={"label"}>
                            Acquisition Method:
                        </label>
                        <input
                            type="text"
                            id={"acquisitionMethod"}
                            name={"acquisitionMethod"}
                            value={formInventory.acquisitionMethod}
                            onChange={handleChange}
                            placeholder={"Enter acquisition method"}
                            required
                            className={"input"}
                        />

                    </div>


                    <div className={"inputGroup"}>
                        <label htmlFor="supplier" className={"label"}>
                            Supplier:
                        </label>
                        <input
                            type="text"
                            id={"supplier"}
                            name={"supplier"}
                            value={formInventory.supplier}
                            onChange={handleChange}
                            placeholder={"Enter supplier"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="lastInventoryCheck" className={"label"}>
                            Last Inventory Check:
                        </label>
                        <input
                            type="date"
                            id={"lastInventoryCheck"}
                            name={"lastInventoryCheck"}
                            value={formInventory.lastInventoryCheck}
                            onChange={handleChange}
                            placeholder={"Enter last inventory check"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="borrowCount" className={"label"}>
                            Borrow Count:
                        </label>
                        <input
                            type="number"
                            id={"borrowCount"}
                            name={"borrowCount"}
                            value={formInventory.borrowCount}
                            onChange={handleChange}
                            placeholder={"Enter borrow count"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="borrowedStatus" className={"label"}>
                            Borrowed Status:
                        </label>
                        <input
                            type="text"
                            id={"borrowedStatus"}
                            name={"borrowedStatus"}
                            value={formInventory.borrowedStatus || ""}
                            onChange={handleChange}
                            placeholder={"Enter borrowed status"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="reserveStatus" className={"label"}>
                            Reserve Status:
                        </label>
                        <input
                            type="text"
                            id={"reserveStatus"}
                            name={"reserveStatus"}
                            value={formInventory.reserveStatus}
                            onChange={handleChange}
                            placeholder={"Enter reserve status"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="replacementCost" className={"label"}>
                            Replacement Cost:
                        </label>
                        <input
                            id={"number"}
                            step="any"
                            name={"replacementCost"}
                            value={formInventory.replacementCost}
                            onChange={handleChange}
                            placeholder={"Enter replacement cost"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="edition" className={"label"}>
                            Edition:
                        </label>
                        <input
                            id={"text"}
                            name={"edition"}
                            value={formInventory.edition}
                            onChange={handleChange}
                            placeholder={"Enter edition"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="publisher" className={"label"}>
                            Publisher:
                        </label>
                        <input
                            type="text"
                            id={"publisher"}
                            name={"publisher"}
                            value={formInventory.publisher}
                            onChange={handleChange}
                            placeholder={"Enter publisher"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="notes" className={"label"}>
                            Notes:
                        </label>
                        <input
                            type="text"
                            id={"notes"}
                            name={"notes"}
                            value={formInventory.notes}
                            onChange={handleChange}
                            placeholder={"Enter notes"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="barcode" className={"label"}>
                            Barcode:
                        </label>
                        <input
                            type="text"
                            id={"barcode"}
                            name={"barcode"}
                            value={formInventory.barcode}
                            onChange={handleChange}
                            placeholder={"Enter barcode"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="isbn" className={"label"}>
                            ISBN:
                        </label>
                        <input
                            type="text"
                            id={"isbn"}
                            name={"isbn"}
                            value={formInventory.isbn}
                            onChange={handleChange}
                            placeholder={"Enter ISBN"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="restockDate" className={"label"}>
                            Restock Date:
                        </label>
                        <input
                            type="date"
                            id={"restockDate"}
                            name={"restockDate"}
                            value={formInventory.restockDate}
                            onChange={handleChange}
                            placeholder={"Enter restock date"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="timesLost" className={"label"}>
                            Times Lost:
                        </label>
                        <input
                            type="number"
                            id={"timesLost"}
                            name={"timesLost"}
                            value={formInventory.timesLost}
                            onChange={handleChange}
                            placeholder={"Enter times lost"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="circulationStatus" className={"label"}>
                            Circulation Status:
                        </label>
                        <input
                            type="text"
                            id={"circulationStatus"}
                            name={"circulationStatus"}
                            value={formInventory.circulationStatus}
                            onChange={handleChange}
                            placeholder={"Enter circulation status"}
                            required
                            className={"input"}
                        />
                    </div>

                    <div className={"inputGroup"}>
                        <label htmlFor="purchaseDate" className={"label"}>
                            Purchase Date:
                        </label>
                        <input
                            type="date"
                            id={"purchaseDate"}
                            name={"purchaseDate"}
                            value={formInventory.purchaseDate}
                            onChange={handleChange}
                            placeholder={"Enter purchase date"}
                            required
                            className={"input"}
                        />
                    </div>

                    <button type={"submit"}>
                        Create Inventory
                    </button>
                </form>
            </article>
        </section>
    );
}

export default CardCreateView;