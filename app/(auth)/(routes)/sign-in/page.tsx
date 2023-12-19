"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import type { WalletName } from "@solana/wallet-adapter-base";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { Wallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function Page() {
  const { wallets, select, wallet, publicKey } = useWallet();

  const [listedWallets, collapsedWallets] = useMemo(() => {
    const installed: Wallet[] = [];
    const loadable: Wallet[] = [];
    const notDetected: Wallet[] = [];

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      }
    }

    let listed: Wallet[] = [];
    let collapsed: Wallet[] = [];

    if (installed.length) {
      listed = installed;
      collapsed = [...loadable, ...notDetected];
    } else if (loadable.length) {
      listed = loadable;
      collapsed = notDetected;
    } else {
      collapsed = notDetected;
    }

    return [listed, collapsed];
  }, [wallets]);

  const handleWalletClick = useCallback(
    (event: MouseEvent, walletName: WalletName) => {
      select(walletName);
    },
    [select]
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="relative flex items-center justify-center mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="w-auto mx-auto"
            src="https://i.ibb.co/KFvGjF6/Capture-d-e-cran-2023-12-13-a-16-27-24-removebg-preview.png"
            alt="Biples"
          />
        </div>

        <div className="w-auto p-10 space-y-5 border shadow-xl rounded-xl login-box min-w-[500px]">
          <div className="text-xl font-[500] text-center">
            {publicKey ? <>Finish sign up</> : <>Connect</>}
          </div>
          {publicKey ? (
            <>
              <button className="bg-[#50FFFF] w-full text-black rounded-lg px-10 py-2 font-bold">
                Sign ownership
              </button>

              <button
                onClick={() => {
                  wallet?.adapter.disconnect();
                }}
                className="flex items-center justify-center gap-2 mx-auto font-light cursor-pointer hover:opacity-80"
              >
                <IoIosLogOut />
                Diconnect
              </button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-5">
                {listedWallets.slice(0, 4).map((wallet) => (
                  <>
                    <div
                      onClick={(event) => {
                        //@ts-ignore
                        handleWalletClick(event, wallet.adapter.name);
                        wallet.adapter.connect();
                      }}
                      className="bg-[rgba(255, 255, 255, 0.05)]"
                    >
                      <div className="flex flex-col justify-center transition-all delay-75 items-center gap-5 p-5 w-[200px] h-[130px] wallet-box cursor-pointer">
                        <div>
                          {wallet && (
                            <img
                              src={wallet.adapter.icon}
                              alt={`${wallet.adapter.name} icon`}
                              className="w-10 h-10"
                            />
                          )}
                        </div>
                        <div className="text-lg font-bold">
                          {wallet.adapter.name}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/*

*/
