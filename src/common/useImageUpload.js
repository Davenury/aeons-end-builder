import { useState } from "react";

export default function useImageUpload() {

    const handleFileUpload = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) return resolve("")

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result)

            reader.onerror = (error) => reject(error)
        })
    }

    return {
        handleFileUpload
    }
}