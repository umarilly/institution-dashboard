import React, { useState } from 'react';

const Issuers: string[] = [
    '0xAuth',
    'Privado ID',
    'EUDI',
    'Portabl',
    'Rarimo',
    'Yoti ID',
    'QuarkID',
    'Verimo',
    'LLoyds Smart ID',
    'HSBC ID',
    'Deutsche Bank ID',
    'Walt ID',
    'Checqd',
    'Fractal ID',
];

const AcceptedIssuers: React.FC = () => {
    const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSelectAll = () => {
        if (selectedIssuers.length === Issuers.length) {
            setSelectedIssuers([]);
        } else {
            setSelectedIssuers(Issuers);
        }
    };

    const handleissuerToggle = (issuer: string) => {
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
                        className="bg-blue-100 text-black px-2 py-1 rounded inline-flex items-center"
                    >
                        {issuer}
                        <button
                            onClick={() => handleissuerToggle(issuer)}
                            className="ml-1 text-red-500 hover:text-red-700"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-300 rounded-md p-2 flex justify-between items-center"
            >
                {selectedIssuers.length ? `${selectedIssuers.length} selected` : 'Select Issuers'}
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="border border-gray-300 rounded-md mt-1 p-2">
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={selectedIssuers.length === Issuers.length}
                            onChange={toggleSelectAll}
                        />
                        <label className="ml-2">Select All</label>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="w-full mb-2 p-1 border border-gray-300 rounded"
                    />
                    <div className="max-h-40 overflow-y-auto">
                        {filteredIssuers.map((issuer) => (
                            <div key={issuer} className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    checked={selectedIssuers.includes(issuer)}
                                    onChange={() => handleissuerToggle(issuer)}
                                />
                                <label className="ml-2">{issuer}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcceptedIssuers;