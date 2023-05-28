"use client";

// componetes
import { Loading as LoadingUI } from "@nextui-org/react"

export function Loading() {
    return (
        <div className="flex justify-center">
            <LoadingUI
                type="points"
            >
                <span className="text-slate-100">Carregando...</span>
            </LoadingUI>
        </div>
    )
}