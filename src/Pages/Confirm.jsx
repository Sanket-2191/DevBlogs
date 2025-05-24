import React from 'react';
import { Button } from '../components/index.js';



const Confirm = ({ handleCloseModal, confirmHandler, textContent, btnText }) => {


    return (
        <div className="fixed w-[100vw] h-[100vh] flex justify-center items-center m-0
         bg-transparent bg-opacity-10 backdrop-blur-lg z-50 top-0 left-0">
            <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-center w-[500px]">
                <h2 className="text-xl font-semibold mb-4 text-white">{textContent} </h2>
                <div className="flex justify-around mt-6">
                    <Button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => {
                            confirmHandler();
                            handleCloseModal();
                            // remove all items from cart after purchase
                        }}
                    >
                        {btnText}
                    </Button>
                    <Button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-200"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
