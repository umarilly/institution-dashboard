import React, { useState } from "react";

const Issuers: string[] = [
    "0xAuth",
    "Privado ID",
    "EUDI",
    "Portabl",
    "Rarimo",
    "Yoti ID",
    "QuarkID",
    "Verimo",
    "LLoyds Smart ID",
    "HSBC ID",
    "Deutsche Bank ID",
    "Walt ID",
    "Checqd",
    "Fractal ID",
];

const MyCheckbox = ({
    name,
    checked,
    onChange,
}: {
    name: string;
    checked?: boolean;
    onChange: () => void;
}) => {
    return (
        <div className="flex justify-between items-center px-5 py-4 border-[1px] border-[#E8E8E8] bg-white rounded-xl">
            <div className="flex items-center gap-2.5">
                <input
                    id={name}
                    type="checkbox"
                    className="accent-[#3E4772]"
                    checked={checked}
                    onChange={onChange}
                />
                <label htmlFor={name} className="text-base text-[#4b4e55]">
                    {name}
                </label>
            </div>
        </div>
    );
};

const AcceptedIssuers: React.FC = () => {
    const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSelectAll = () => {
        if (selectedIssuers.length === Issuers.length) {
            setSelectedIssuers([]);
        } else {
            setSelectedIssuers(Issuers);
        }
    };

    const handleIssuerToggle = (issuer: string) => {
        if (selectedIssuers.includes(issuer)) {
            setSelectedIssuers(selectedIssuers.filter((c) => c !== issuer));
        } else {
            setSelectedIssuers([...selectedIssuers, issuer]);
        }
    };

    const filteredIssuers = Issuers.filter((issuer) =>
        issuer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-1 mb-2">
                {selectedIssuers.map((issuer) => (
                    <span
                        key={issuer}
                        className="bg-gray-200 text-black px-3 py-2 rounded inline-flex items-center"
                    >
                        {issuer}
                        <button
                            onClick={() => handleIssuerToggle(issuer)}
                            className="ml-2 text-lg font-bold text-red-500 hover:text-red-700"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-300 text-[#4b4e55] rounded-md py-4 px-6 flex justify-between items-center"
            >
                {selectedIssuers.length ? `${selectedIssuers.length} selected` : "Select Issuers"}
                <span>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <div className="border border-gray-300 rounded-md mt-1 p-2">
                    <MyCheckbox
                        name="Select All"
                        checked={selectedIssuers.length === Issuers.length}
                        onChange={toggleSelectAll}
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="w-full mb-2 p-4 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <div className="max-h-60 overflow-y-auto">
                        {filteredIssuers.map((issuer) => (
                            <MyCheckbox
                                key={issuer}
                                name={issuer}
                                checked={selectedIssuers.includes(issuer)}
                                onChange={() => handleIssuerToggle(issuer)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcceptedIssuers;