import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "@Utils/CreateReactScript";
import Table from "../Components/Table";
import DxButton from "../Components/dx/DxButton";
import ReactAppend from "@Utils/ReactAppend";
import MessagesRest from "@Rest/Admin/MessagesRest";
import Modal from "@Adminto/Modal";
import Swal from "sweetalert2";

const messagesRest = new MessagesRest();

const Messages = ({ is_general = false }) => {
    const gridRef = useRef();
    const modalRef = useRef();

    const [dataLoaded, setDataLoaded] = useState(null);

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar mensaje",
            text: "¿Estas seguro de eliminar este mensaje?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await messagesRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onModalOpen = (data) => {
        if (!data.seen) {
            messagesRest.boolean({
                id: data,
                field: "seen",
                value: true,
            });
            $(gridRef.current).dxDataGrid("instance").refresh();
        }
        setDataLoaded(data);
        $(modalRef.current).modal("show");
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title={"Mensajes"}
                rest={messagesRest}
                exportable={true}
                extraParams={{ is_general, with: "facility,service" }}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refresh table",
                            onClick: () =>
                                $(gridRef.current)
                                    .dxDataGrid("instance")
                                    .refresh(),
                        },
                    });
                }}
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "name",
                        caption: "Nombre",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <span
                                    style={{
                                        width: "100%",
                                        fontWeight: data.seen
                                            ? "lighter"
                                            : "bold",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => onModalOpen(data)}
                                >
                                    {data.name}
                                </span>,
                            );
                        },
                    },
                    {
                        dataField: "email",
                        caption: "Correo",
                    },
                    {
                        dataField: "phone",
                        caption: "Teléfono",
                    },
                    {
                        dataField: "service.title",
                        caption: "Motivo (Servicio)",
                        visible: !is_general,
                        cellTemplate: (container, { data }) => {
                            container.text(data.service?.title || "General");
                        },
                    },
                    {
                        dataField: "facility.title",
                        caption: "Sede",
                        visible: !is_general,
                        cellTemplate: (container, { data }) => {
                            container.text(data.facility?.title || "-");
                        },
                    },
                    {
                        dataField: "subject",
                        caption: "Asunto",
                    },
                    /*  {
                        dataField: "work_type",
                        caption: "Work Type",
                        visible: !is_general,
                    }, */
                    /*  {
                        dataField: "residue_level",
                        caption: "Residue",
                        visible: !is_general,
                    }, */
                    {
                        dataField: "utm_source",
                        caption: "Fuente (Source)",
                    },
                    {
                        dataField: "utm_medium",
                        caption: "Medio (Medium)",
                    },
                    {
                        dataField: "utm_campaign",
                        caption: "Campaña (Campaign)",
                    },
                    {
                        dataField: "created_at",
                        caption: "Fecha de creación",
                        dataType: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss",
                        sortOrder: "desc",
                    },
                    {
                        dataField: "status",
                        caption: "Estado",
                        dataType: "boolean",
                        cellTemplate: (container, { data }) => {
                            if (data.seen) {
                                ReactAppend(
                                    container,
                                    <span className="badge bg-success rounded-pill">
                                        Leído
                                    </span>,
                                );
                            } else {
                                ReactAppend(
                                    container,
                                    <span className="badge bg-danger rounded-pill">
                                        No leído
                                    </span>,
                                );
                            }
                        },
                    },
                    {
                        caption: "Acciones",
                        cellTemplate: (container, { data }) => {
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-dark",
                                    title: "Ver detalles",
                                    icon: "fa fa-eye",
                                    onClick: () => onModalOpen(data),
                                }),
                            );
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Eliminar",
                                    icon: "fa fa-trash",
                                    onClick: () => onDeleteClicked(data.id),
                                }),
                            );
                        },
                        allowFiltering: false,
                        allowExporting: false,
                    },
                ]}
            />
            <Modal
                modalRef={modalRef}
                title={
                    is_general
                        ? "Detalles de Consulta General"
                        : "Detalles de Solicitud de Cita"
                }
                hideFooter
                size="xl"
            >
                <div className="p-2">
                    {/* Header Section */}
                    <div className="bg-light p-4 rounded-4 mb-4 border d-flex justify-content-between align-items-center shadow-sm">
                        <div className="d-flex align-items-center">
                            <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                                <i className="mdi mdi-email-open-outline fs-2 text-info"></i>
                            </div>
                            <div>
                                <h4 className="mb-1 fw-bold text-dark">
                                    {dataLoaded?.name}
                                </h4>
                                <div className="d-flex align-items-center gap-2">
                                    <span className="badge bg-soft-primary text-primary border border-primary px-3 py-1 fs-13">
                                        <i className="mdi mdi-tag-outline me-1"></i>
                                        {dataLoaded?.service?.title ||
                                            "Solicitud de Cita"}
                                    </span>
                                    <span className="text-muted small">
                                        <i className="mdi mdi-clock-outline me-1"></i>
                                        {new Date(
                                            dataLoaded?.created_at,
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            {dataLoaded?.seen ? (
                                <div className="text-center">
                                    <span className="badge bg-success rounded-pill px-3 py-2 fs-12 mb-1 d-block shadow-sm">
                                        <i className="mdi mdi-check-all me-1"></i>{" "}
                                        PROCESADO
                                    </span>
                                    <small className="text-muted fw-semibold uppercase tracking-wider">
                                        Estado: Revisado
                                    </small>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <span className="badge bg-danger rounded-pill px-3 py-2 fs-12 mb-1 d-block shadow-sm animate-pulse">
                                        <i className="mdi mdi-new-box me-1"></i>{" "}
                                        PENDIENTE
                                    </span>
                                    <small className="text-muted fw-semibold uppercase tracking-wider">
                                        Estado: Nuevo
                                    </small>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Column 1: Sender Information */}
                        <div className="col-lg-4">
                            <div className="card border shadow-none rounded-4 h-100 mb-0 overflow-hidden">
                                <div className="card-header bg-white border-bottom py-3">
                                    <h5 className="card-title mb-0 fs-16 fw-bold">
                                        <i className="mdi mdi-account-box-outline text-primary me-2"></i>
                                        Datos de Contacto
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    {dataLoaded?.company && (
                                        <div className="mb-4">
                                            <label className="text-muted text-uppercase fw-bold fs-11 tracking-wider mb-1 d-block">
                                                Empresa / Negocio
                                            </label>
                                            <div className="fs-5 fw-bold text-primary">
                                                {dataLoaded?.company}
                                            </div>
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        <label className="text-muted text-uppercase fw-bold fs-11 tracking-wider mb-1 d-block">
                                            Nombre del Remitente
                                        </label>
                                        <div className="fs-5 fw-semibold text-dark">
                                            {dataLoaded?.name}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-muted text-uppercase fw-bold fs-11 tracking-wider mb-1 d-block">
                                            Métodos de Contacto
                                        </label>
                                        <div className="d-flex flex-column gap-2 mt-2">
                                            <a
                                                href={`mailto:${dataLoaded?.email}`}
                                                className="btn btn-sm btn-soft-primary text-start px-3 py-2 rounded-3 border-0"
                                            >
                                                <i className="mdi mdi-email-outline me-2"></i>
                                                {dataLoaded?.email || "N/A"}
                                            </a>
                                            <a
                                                href={`tel:${dataLoaded?.phone}`}
                                                className="btn btn-sm btn-soft-success text-start px-3 py-2 rounded-3 border-0"
                                            >
                                                <i className="mdi mdi-phone me-2"></i>
                                                {dataLoaded?.phone || "N/A"}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-top mt-auto">
                                        <label className="text-muted text-uppercase fw-bold fs-11 tracking-wider mb-1 d-block">
                                            Asunto de la Solicitud
                                        </label>
                                        <div className="fw-bold text-dark fs-14 bg-light p-2 rounded">
                                            {dataLoaded?.subject ||
                                                "Sin asunto proporcionado"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Specific Requirements */}
                        <div className="col-lg-8">
                            <div className="row g-4 h-100">
                                {/* Service Details & Location */}
                                <div className="col-12">
                                    <div className="card border shadow-none rounded-4 mb-0 overflow-hidden">
                                        <div className="card-header bg-white border-bottom py-3">
                                            <h5 className="card-title mb-0 fs-16 fw-bold">
                                                <i className="mdi mdi-office-building-marker-outline text-info me-2"></i>
                                                Información del Establecimiento
                                                y Servicio
                                            </h5>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="row">
                                                <div className="col-md-6 mb-4 mb-md-0">
                                                    <label className="text-muted text-uppercase fw-bold fs-11 tracking-wider mb-2 d-block">
                                                        Sede de Atención
                                                    </label>
                                                    <div className="d-flex">
                                                        <div className="bg-soft-danger p-2 rounded-3 me-3">
                                                            <i className="mdi mdi-map-marker-radius fs-4 text-danger"></i>
                                                        </div>
                                                        <div>
                                                            <div className="fw-bold fs-15 text-dark mb-1">
                                                                {dataLoaded
                                                                    ?.facility
                                                                    ?.title ||
                                                                    "No especificada"}
                                                            </div>
                                                            <div className="text-muted fs-14">
                                                                {dataLoaded
                                                                    ?.facility
                                                                    ?.description ||
                                                                    ""}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="p-3 bg-light rounded-4 border h-100 d-flex flex-column justify-content-center">
                                                        <div className="mb-3">
                                                            <label className="text-muted text-uppercase fw-bold fs-10 tracking-wider mb-1 d-block text-center">
                                                                Servicio /
                                                                Motivo
                                                            </label>
                                                            <div className="fs-5 fw-bold text-primary text-center">
                                                                {dataLoaded
                                                                    ?.service
                                                                    ?.title ||
                                                                    "Consulta General"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="col-12 mt-auto">
                                    <div className="card border shadow-none rounded-4 mb-0 overflow-hidden">
                                        <div className="card-header bg-white border-bottom py-2 d-flex justify-content-between align-items-center">
                                            <h6 className="mb-0 fs-14 fw-bold">
                                                <i className="mdi mdi-message-text-outline me-2 text-muted"></i>
                                                Contenido del Mensaje /
                                                Requerimientos
                                            </h6>
                                            <i className="mdi mdi-format-quote-open text-light fs-2"></i>
                                        </div>
                                        <div className="card-body p-4 bg-light bg-opacity-25">
                                            <div
                                                className="fs-15 text-dark leading-relaxed font-italic line-height-lg"
                                                style={{
                                                    whiteSpace: "pre-wrap",
                                                    borderLeft:
                                                        "3px solid #dee2e6",
                                                    paddingLeft: "1.5rem",
                                                }}
                                            >
                                                {dataLoaded?.description || (
                                                    <span className="text-muted">
                                                        El cliente no
                                                        proporcionó
                                                        instrucciones
                                                        específicas o
                                                        comentarios adicionales.
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* UTM / Origin Information - Enhanced UI - Full Width at Bottom */}
                    <div className="card border-0 shadow-sm rounded-4 mt-4 overflow-hidden">
                        <div className="card-header bg-dark bg-opacity-75 py-3 border-0">
                            <h5 className="card-title mb-0 fs-16 fw-bold text-white d-flex align-items-center">
                                <i className="mdi mdi-bullseye-arrow me-2 fs-4"></i>
                                Procedencia del Lead (Marketing Data)
                            </h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="row g-0">
                                <div className="col-md-2 border-end border-bottom">
                                    <div className="p-3 text-center">
                                        <i className="mdi mdi-source-branch text-primary fs-3 d-block mb-1"></i>
                                        <label className="text-muted text-uppercase fw-bold fs-10 tracking-wider mb-1 d-block">Source</label>
                                        <div className="fw-bold text-dark fs-13">{dataLoaded?.utm_source || "Orgánico"}</div>
                                    </div>
                                </div>
                                <div className="col-md-2 border-end border-bottom">
                                    <div className="p-3 text-center">
                                        <i className="mdi mdi-vector-point text-success fs-3 d-block mb-1"></i>
                                        <label className="text-muted text-uppercase fw-bold fs-10 tracking-wider mb-1 d-block">Medium</label>
                                        <div className="fw-bold text-dark fs-13">{dataLoaded?.utm_medium || "Directo"}</div>
                                    </div>
                                </div>
                                <div className="col-md-3 border-end border-bottom">
                                    <div className="p-3 text-center">
                                        <i className="mdi mdi-google-ads text-danger fs-3 d-block mb-1"></i>
                                        <label className="text-muted text-uppercase fw-bold fs-10 tracking-wider mb-1 d-block">Campaign</label>
                                        <div className="fw-bold text-dark fs-13 text-truncate" title={dataLoaded?.utm_campaign}>{dataLoaded?.utm_campaign || "N/A"}</div>
                                    </div>
                                </div>
                                <div className="col-md-2 border-end border-bottom">
                                    <div className="p-3 text-center">
                                        <i className="mdi mdi-text-search text-info fs-3 d-block mb-1"></i>
                                        <label className="text-muted text-uppercase fw-bold fs-10 tracking-wider mb-1 d-block">Term</label>
                                        <div className="fw-bold text-dark fs-13 text-truncate" title={dataLoaded?.utm_term}>{dataLoaded?.utm_term || "N/A"}</div>
                                    </div>
                                </div>
                                <div className="col-md-3 border-bottom">
                                    <div className="p-3 text-center">
                                        <i className="mdi mdi-content-paste text-warning fs-3 d-block mb-1"></i>
                                        <label className="text-muted text-uppercase fw-bold fs-10 tracking-wider mb-1 d-block">Content</label>
                                        <div className="fw-bold text-dark fs-13 text-truncate" title={dataLoaded?.utm_content}>{dataLoaded?.utm_content || "N/A"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Messages">
            <Messages {...properties} />
        </BaseAdminto>,
    );
});
