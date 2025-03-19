"use client"
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AlertMessageProps = {
  alert_message: string;
};

const Toastalert = ({ alert_message }: AlertMessageProps) => {
  useEffect(() => {
    if (alert_message) {
      toast.success(alert_message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  }, [alert_message]);

  return <ToastContainer />;
};

export default Toastalert;
