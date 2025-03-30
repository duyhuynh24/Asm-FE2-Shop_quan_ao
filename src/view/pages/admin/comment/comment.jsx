import HeaderAdmin from "../layout/header";
import "./comment.css";

const Comment = () => {
    return (
        <>
        <HeaderAdmin />
            <div className="comment-container">
                <div className="comment-wrapper">
                    <div className="comment-box">
                        <h2 className="comment-title">DANH SÁCH BÌNH LUẬN</h2>
                        <div className="table-responsive">
                            <table className="comment-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên Người Dùng</th>
                                        <th>Bình Luận</th>
                                        <th>Trạng Thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Nguyễn Văn A</td>
                                        <td>Sản phẩm rất tốt!</td>
                                        <td>Hiển thị</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Trần Thị B</td>
                                        <td>Giao hàng nhanh, đóng gói cẩn thận.</td>
                                        <td>Ẩn</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Lê Văn C</td>
                                        <td>Chất lượng vải đẹp, sẽ ủng hộ tiếp.</td>
                                        <td>Hiển thị</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Comment;
