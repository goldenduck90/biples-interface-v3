"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import type { WalletName } from "@solana/wallet-adapter-base";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { Wallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo } from "react";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}

/*
<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="relative flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="w-auto mx-auto"
          src="https://i.ibb.co/KFvGjF6/Capture-d-e-cran-2023-12-13-a-16-27-24-removebg-preview.png"
          alt="Biples"
        />

        <span className="absolute bottom-0 inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-400 rounded-md bg-indigo-400/10 ring-1 ring-inset ring-indigo-400/30">
          BETA V0.01
        </span>
      </div>

      <div className="p-5 mt-10 space-y-5 border border-gray-800 rounded-md shadow-xl sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-col gap-3">
          {listedWallets.map((wallet) => (
            <>
              <div
                onClick={(event) => {
                  //@ts-ignore
                  handleWalletClick(event, wallet.adapter.name);
                  wallet.adapter.connect();
                }}
                className=" w-full cursor-pointer justify-between items-center hover:opacity-80 px-2 flex gap-2  rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              >
                <div className="flex items-center gap-2">
                  <div>
                    {wallet && (
                      <img
                        src={wallet.adapter.icon}
                        alt={`${wallet.adapter.name} icon`}
                        className="w-5 h-5"
                      />
                    )}
                  </div>
                  {wallet.adapter.name}
                </div>

                <div className="text-xs text-white/70">DETECTED</div>
              </div>
            </>
          ))}
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
*/
