import React, { useEffect, useState } from 'react';



function GetData(path: string) {
    const [fileData, setFileData] = useState('');

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const response = await fetch(path);
                const blob = await response.blob()
                const text = await new Response(blob).text();
                setFileData(text);
            } catch (error) {
                console.error('Error fetching file data:', error);
            }
        };

        fetchFileData();
    }, []);
    return fileData
}    

export default GetData