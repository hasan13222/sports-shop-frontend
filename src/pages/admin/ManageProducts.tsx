import { Button, ConfigProvider, Modal, Space, Spin, Table } from "antd";
import { FaPlus } from "react-icons/fa6";
import { columns } from "../../constants/manageProductTitle";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { content } from "../../components/ui/Loading";
import ProductForm from "../../components/form/ProductForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFormMode, setmodalOpen, setProductId, setProductPicture } from "../../redux/features/product/productSlice";
import { CustomError } from "../../types/baseQueryApi";

const ManageProducts = () => {
  const { modalOpen, loading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(setmodalOpen(true));
    dispatch(setFormMode("add"));
    dispatch(setProductId(""))
    dispatch(setProductPicture(""))
  };

  const handleCancel = () => {
    dispatch(setmodalOpen(false));
  };

  const {
    data: products,
    isError,
    error,
    isFetching,
    isLoading,
  }: Record<string, any> = useGetProductsQuery({limit: Number.POSITIVE_INFINITY});


  return (
    <>
      <div className="container mx-auto">
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}

        {isError && <p>{(error as CustomError)?.data?.message}</p>}
      </div>
      <div className="manage_products container mx-auto px-3 py-8">
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#00b96b",
              borderRadius: 6,
              // Alias Token
              colorBgContainer: "#f6ffed",
            },
          }}
        >
          <Space>
            <Button onClick={showModal} className="py-5 mb-5" type="primary">
              {" "}
              <FaPlus /> Add Product <span>&nbsp;</span>
            </Button>
          </Space>
        </ConfigProvider>

        {/* modal */}
        <Modal
          title="Title"
          open={modalOpen}
          footer={null}
          confirmLoading={loading}
          onCancel={handleCancel}
        >
          <ProductForm />
        </Modal>

        <Table
          columns={columns}
          dataSource={products?.data?.result}
          rowKey={(record) => record._id}
        />
      </div>
    </>
  );
};

export default ManageProducts;
