import { Transition } from "@headlessui/react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import cx from "classnames";
import React, { Fragment, useState } from "react";

/**
 *
 * @param trigger
 * @param {function} onConfirm
 * @param string title
 * @param string description
 * @param {"alert" | "warning"} type
 * @returns {JSX.Element}
 * @constructor
 */
const AlertDialog = ({trigger, onConfirm, title, description, type="alert"}) => {
    let [isOpen, setIsOpen] = useState(false);

    return (
        <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogPrimitive.Trigger asChild>
                {trigger}
            </AlertDialogPrimitive.Trigger>
            <AlertDialogPrimitive.Portal forceMount>
                <Transition.Root show={isOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <AlertDialogPrimitive.Overlay
                            forceMount
                            className="fixed inset-0 z-20 bg-black/50"
                        />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <AlertDialogPrimitive.Content
                            forceMount
                            className={cx(
                                "fixed z-50",
                                "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                                "bg-white dark:bg-gray-800",
                                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                            )}
                        >
                            <AlertDialogPrimitive.Title className="text-sm font-bold font-medium text-gray-900 dark:text-gray-100">
                                {title}
                            </AlertDialogPrimitive.Title>
                            <AlertDialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                                {description}
                            </AlertDialogPrimitive.Description>
                            <div className="mt-4 flex justify-end space-x-2">
                                <AlertDialogPrimitive.Cancel
                                    className={cx(
                                        "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                                        "bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600",
                                        "border border-gray-300 dark:border-transparent",
                                        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                                    )}
                                >
                                    Cancel
                                </AlertDialogPrimitive.Cancel>
                                <AlertDialogPrimitive.Action
                                    onClick={onConfirm}
                                    className={cx(
                                        'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium border border-transparent',
                                        {"bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:text-gray-100 dark:hover:bg-red-600 focus-visible:ring-red-500": type === 'alert'},
                                        {"bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-700 dark:text-gray-100 dark:hover:bg-yellow-600 focus-visible:ring-yellow-500": type === 'warning'},
                                        `focus:outline-none focus-visible:ring focus-visible:ring-opacity-75`
                                    )}
                                >
                                    Confirm
                                </AlertDialogPrimitive.Action>
                            </div>
                        </AlertDialogPrimitive.Content>
                    </Transition.Child>
                </Transition.Root>
            </AlertDialogPrimitive.Portal>
        </AlertDialogPrimitive.Root>
    );
};

export default AlertDialog;
