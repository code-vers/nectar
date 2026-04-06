import { GoPeople } from "react-icons/go";

const AddressSection = () => {
    return (
        <section className="">
            <div className="flex items-center">
                <div className="bg-primary p-4 rounded-full">
                    <GoPeople/>
                </div>
                <div>
                    <h1>Our Phone</h1>       
                    <p>(316) 555-0116</p>           
                </div>
            </div>
        </section>
    );
};

export default AddressSection;