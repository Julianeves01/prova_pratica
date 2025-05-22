"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "../../styles/livro.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Livros() {
    const [data, setData] = useState({
        livros: [],
        loading: true,
        current: 1,
        pageSize: 5,
    });
    const [modalInfo, setModalInfo] = useState({
        visible: false,
        livro: null,
        autor: null,
        loading: false,
    });

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const { data: livros } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/livros`,
                    { headers: HEADERS }
                );
                setData({ livros, loading: false, current: 1, pageSize: 5 });
            } catch {
                toast.error("Erro ao carregar livros");
                setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchLivros();
    }, []);

    const openModal = async (livro) => {
        setModalInfo({ visible: true, livro, autor: null, loading: true });
        try {
            const { data: autor } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/autor/${livro.id}`,
                { headers: HEADERS }
            );
            setModalInfo((m) => ({ ...m, autor, loading: false }));
        } catch {
            toast.error("Erro ao carregar autor");
            setModalInfo((m) => ({ ...m, loading: false }));
        }
    };

    const paginatedLivros = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.livros.slice(start, start + data.pageSize);
    };

    return (
        <div className={styles.container}>
            <div className={styles.bloco}>
                <h1>Lista de Livros</h1>
                <Pagination
                    className={styles.pagination}
                    current={data.current}
                    pageSize={data.pageSize}
                    total={data.livros.length}
                    onChange={(page, size) => {
                        setData((d) => ({ ...d, current: page, pageSize: size }));
                    }}
                    showSizeChanger
                    pageSizeOptions={["5", "10", "50"]}
                />
                {data.loading ? (
                    <Image
                        src="/loading.gif"
                        alt="Loading"
                        className={styles.loading}
                        width={100}
                        height={100}
                    />
                ) : (
                    <div className={styles.cardsContainer}>
                        {paginatedLivros().map((livro) => (
                            <Card
                                key={livro.id}
                                className={styles.card}
                                hoverable
                                onClick={() => openModal(livro)}
                                cover={
                                    <Image
                                        alt={livro.titulo}
                                        src={livro.photo ? livro.photo : "/220.svg"}
                                        width={220}
                                        height={220}
                                    />
                                }
                            >
                                <Card.Meta
                                    title={livro.titulo}
                                    description={`Autor: ${livro.autor}`}
                                />
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Modal title={`Avaliação de ${modalInfo.livro?.titulo}`}
                open={modalInfo.visible}
                onCancel={() =>
                    setModalInfo({
                        visible: false,
                        livro: null,
                        autor: null,
                        loading: false,
                    })
                }
                onOk={() =>
                    setModalInfo({
                        visible: false,
                        livro: null,
                        autor: null,
                        loading: false,
                    })
                }
                width={600}
            >
                {modalInfo.loading ? (
                    <Skeleton active />
                ) : modalInfo.autor ? (
                    <div className={styles.autorInfo}>
                        <p>
                            <span className={styles.label}>Autor:</span>{""}
                            {modalInfo.autor.nome}
                        </p>
                        <p>
                            <span className={styles.label}>Nacionalidade:</span>{""}
                            {modalInfo.autor.nacionalidade || "Não informado"}
                        </p>
                    </div>
                ) : (
                    <p style={{ textAlign: "center" }}>Informações do autor não disponíveis</p>
                )}
            </Modal>
            <ToastContainer position="top-right" autoClose={4500} />
        </div>
    );
}