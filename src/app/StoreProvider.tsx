'use client'

import { ELocalStorage } from "@/enum/localStorage/localStorage.enum";
import { IIp } from "@/inteface/ip/ipInterface";
import { getIpApiAsync, postIpAsync } from "@/lib/store/feature/ip/ipSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactNode }) {

    const storeRef = useRef<AppStore>(undefined);
    
    if(!storeRef.current) {
        storeRef.current = makeStore();

        if (typeof window !== "undefined") {
            const ipId: string | null = localStorage.getItem(ELocalStorage.IpId)
        
            if(!ipId) {
                storeRef.current.dispatch(getIpApiAsync()).unwrap()
                .then((data: IIp | undefined) => {
                    if(data) {
                        storeRef.current?.dispatch(postIpAsync(data))
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }

    }

    return <Provider store={storeRef.current}>{children}</Provider>

}