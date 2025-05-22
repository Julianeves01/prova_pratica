"use client";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../utils/sessionStorage";
import styles from "./Livros.module.css";

const HEADERS = {"x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Livros() {
    const [data, setData] = useState({
        livros: [],
        loading: true,
        current: 1,
        pageSize: 0,
    });
    const [modalInfo, setModalInfo] = useState ({
        visible: false,
        livro: null,
        loading: false,
    });

    useEffect(() => {
        const fetchLivros = async () => {
            const cached = getSessionStorage("livros", []);
            if (cached.length > 0) {
                setData({ })
            }
        }