/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { booksApi } from "../../services/books.service";
import { categoriesApi } from "../../services/categories.service";
import { authorsApi } from "../../services/authors.service";
import { publishersApi } from "../../services/publishers.service";
import { bookCategoriesApi } from "../../services/book_categories.service";
import { bookAuthorsApi } from "../../services/book_authors.service";

type BookFormValues = {
  title: string;
  isbn?: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_ids: string[];
  author_ids: string[];
  publisher_id: string;
  published_date?: string;
  language?: string;
  cover_image?: File | null;
};

const AdminBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { register, handleSubmit, setValue, reset } = useForm<BookFormValues>();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>([]);

  // Fetch dropdown data
  const { data: categories } = useQuery(["categories"], categoriesApi.getAll);
  const { data: authors } = useQuery(["authors"], authorsApi.getAll);
  const { data: publishers } = useQuery(["publishers"], publishersApi.getAll);

  // Load existing book data
  const { data: book, isLoading } = useQuery(
    ["admin-book", id],
    () => booksApi.getByID(id as string),
    {
      enabled: isEdit,
    }
  );

  // Load existing categories and authors when editing
  const { data: existingCategories } = useQuery(
    ["book-categories", id],
    () => bookCategoriesApi.getByBook(id as string),
    { enabled: isEdit && !!id }
  );

  const { data: existingAuthors } = useQuery(
    ["book-authors", id],
    () => bookAuthorsApi.getByBook(id as string),
    { enabled: isEdit && !!id }
  );

  // Reset form when book data loads
  useEffect(() => {
    if (book && isEdit) {
      reset({
        title: book.title || "",
        isbn: book.isbn || "",
        description: book.description || "",
        price: book.price || 0,
        stock_quantity: book.stock_quantity || 0,
        publisher_id: book.publisher_id || "",
        published_date: book.published_date
          ? book.published_date.split("T")[0]
          : "",
        language: book.language || "",
      });
      setPreview(book.cover_image || null);
    }
  }, [book, isEdit, reset]);

  // Update categories when existingCategories loads
  useEffect(() => {
    if (isEdit && id) {
      if (existingCategories === undefined) {
        // Still loading, don't update yet
        return;
      }

      if (Array.isArray(existingCategories)) {
        if (existingCategories.length > 0) {
          const catIds = existingCategories
            .map((c: any) => {
              // Handle different possible field names
              const id = c.category_id || c.categoryId || c.id;
              return id ? String(id) : null;
            })
            .filter(Boolean) as string[];

          setSelectedCategoryIds(catIds);
          setValue("category_ids", catIds);
        } else {
          // Empty array means no categories linked
          setSelectedCategoryIds([]);
          setValue("category_ids", []);
        }
      }
    } else if (!isEdit) {
      // Reset when not in edit mode
      setSelectedCategoryIds([]);
      setValue("category_ids", []);
    }
  }, [existingCategories, isEdit, setValue, id]);

  // Update authors when existingAuthors loads
  useEffect(() => {
    if (isEdit && id) {
      if (existingAuthors === undefined) {
        // Still loading, don't update yet
        return;
      }

      if (Array.isArray(existingAuthors)) {
        if (existingAuthors.length > 0) {
          const authIds = existingAuthors
            .map((a: any) => {
              // Handle different possible field names
              const id = a.author_id || a.authorId || a.id;
              return id ? String(id) : null;
            })
            .filter(Boolean) as string[];

          setSelectedAuthorIds(authIds);
          setValue("author_ids", authIds);
        } else {
          // Empty array means no authors linked
          setSelectedAuthorIds([]);
          setValue("author_ids", []);
        }
      }
    } else if (!isEdit) {
      // Reset when not in edit mode
      setSelectedAuthorIds([]);
      setValue("author_ids", []);
    }
  }, [existingAuthors, isEdit, setValue, id]);

  // Handle image upload preview
  const handleImageSelect = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setValue("cover_image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle category selection
  const handleCategoryToggle = (categoryId: string) => {
    const catIdStr = String(categoryId);
    setSelectedCategoryIds((prev) => {
      const newIds = prev.includes(catIdStr)
        ? prev.filter((id) => id !== catIdStr)
        : [...prev, catIdStr];
      setValue("category_ids", newIds);
      return newIds;
    });
  };

  // Handle author selection
  const handleAuthorToggle = (authorId: string) => {
    const authIdStr = String(authorId);
    setSelectedAuthorIds((prev) => {
      const newIds = prev.includes(authIdStr)
        ? prev.filter((id) => id !== authIdStr)
        : [...prev, authIdStr];
      setValue("author_ids", newIds);
      return newIds;
    });
  };

  const mutation = useMutation(
    async (data: any) => {
      // Get author_ids and category_ids from both form data and state
      const authorIdsFromData = data.author_ids || [];
      const categoryIdsFromData = data.category_ids || [];

      // Use state if form data is empty (fallback)
      const author_ids = authorIdsFromData.length > 0 ? authorIdsFromData : selectedAuthorIds;
      const category_ids = categoryIdsFromData.length > 0 ? categoryIdsFromData : selectedCategoryIds;

      const { category_ids: _, author_ids: __, ...bookData } = data;

      // Validation
      if (!category_ids || category_ids.length === 0) {
        throw new Error("Vui lòng chọn ít nhất một danh mục!");
      }

      if (!author_ids || author_ids.length === 0) {
        throw new Error("Vui lòng chọn ít nhất một tác giả!");
      }

      let bookId: string;

      if (isEdit) {
        // Update book
        await booksApi.update(id as string, bookData);
        bookId = id as string;

        // Remove old relationships before adding new ones
        try {
          // Fetch old relationships in parallel
          const [oldCategories, oldAuthors] = await Promise.all([
            bookCategoriesApi.getByBook(bookId).catch(() => []),
            bookAuthorsApi.getByBook(bookId).catch(() => []),
          ]);

          // Unlink old categories
          if (oldCategories && Array.isArray(oldCategories) && oldCategories.length > 0) {
            for (const cat of oldCategories) {
              try {
                const catId = cat.category_id || cat.categoryId || cat.id;
                await bookCategoriesApi.unlink({
                  book_id: bookId,
                  category_id: catId,
                });
              } catch (e) {
                console.warn("Failed to unlink category:", cat, e);
              }
            }
          }

          // Unlink old authors
          if (oldAuthors && Array.isArray(oldAuthors) && oldAuthors.length > 0) {
            for (const auth of oldAuthors) {
              try {
                const authId = auth.author_id || auth.authorId || auth.id;
                await bookAuthorsApi.unlink({
                  book_id: bookId,
                  author_id: authId,
                });
              } catch (e) {
                console.warn("Failed to unlink author:", auth, e);
              }
            }
          }
        } catch (e) {
          console.warn("Failed to fetch old relationships:", e);
        }
      } else {
        // Create book
        const created = await booksApi.create(bookData);

        // Backend should return the full book object with book_id
        // Try multiple possible field names
        bookId = created?.book_id
          || created?.bookId
          || created?.id
          || created?.data?.book_id
          || created?.data?.bookId
          || created?.data?.id;

        if (!bookId) {
          throw new Error("Không thể lấy ID sách sau khi tạo. Vui lòng thử lại.");
        }
      }

      // Link new categories and authors
      const linkErrors: string[] = [];

      // Link categories
      for (const categoryId of category_ids) {
        try {
          await bookCategoriesApi.link({
            book_id: bookId,
            category_id: categoryId,
          });
        } catch (e: any) {
          const errorMsg = `Không thể liên kết danh mục ${categoryId}: ${e?.message || e}`;
          console.error(errorMsg, e);
          linkErrors.push(errorMsg);
        }
      }

      // Link authors
      for (const authorId of author_ids) {
        try {
          await bookAuthorsApi.link({
            book_id: bookId,
            author_id: authorId,
          });
        } catch (e: any) {
          const errorMsg = `Không thể liên kết tác giả ${authorId}: ${e?.message || e}`;
          console.error(errorMsg, e);
          linkErrors.push(errorMsg);
        }
      }

      // If there are errors linking relationships, show warning but don't fail completely
      if (linkErrors.length > 0) {
        console.warn("Some relationships failed to link:", linkErrors);
      }

      return { bookId };
    },
    {
      onSuccess: () => {
        navigate("/admin/books");
      },
      onError: (error: any) => {
        alert(error?.message || "Có lỗi xảy ra khi lưu sách.");
      },
    }
  );

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  if (isEdit && isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="text-black">Đang tải thông tin sách...</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto"
    >
      <h2 className="font-bold text-lg mb-4 text-black">
        {isEdit ? "Cập nhật sách" : "Thêm sách"}
      </h2>

      <div className="space-y-4">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Tên sách <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 rounded w-full px-3 py-2 text-sm text-black bg-white"
            {...register("title", { required: "Không được bỏ trống" })}
          />
        </div>

        {/* ISBN */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            ISBN
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-3 py-2 text-sm text-black bg-white"
            placeholder="Nhập mã ISBN (tùy chọn)"
            {...register("isbn")}
          />
        </div>

        {/* CATEGORIES - Multiple Selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            Danh mục <span className="text-red-500">*</span> (có thể chọn nhiều)
          </label>
          <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto bg-gray-50">
            {categories && categories.length > 0 ? (
              <div className="space-y-2">
                {categories.map((c: any) => {
                  const catId = c.category_id || c.categoryId || c.id;
                  const catIdStr = String(catId);

                  // Always check from state first
                  let isChecked = selectedCategoryIds.includes(catIdStr);

                  // Only fallback to existingCategories if state is empty (initial load) and we're in edit mode
                  if (!isChecked && selectedCategoryIds.length === 0 && isEdit && existingCategories && Array.isArray(existingCategories)) {
                    isChecked = existingCategories.some((ec: any) => {
                      const existingId = ec.category_id || ec.categoryId || ec.id;
                      return String(existingId) === catIdStr;
                    });
                  }

                  return (
                    <label
                      key={catId}
                      className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(catIdStr)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-black select-none">{c.name}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Chưa có danh mục nào</p>
            )}
          </div>
          {selectedCategoryIds.length > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              Đã chọn {selectedCategoryIds.length} danh mục
            </p>
          )}
        </div>

        {/* AUTHORS - Multiple Selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            Tác giả <span className="text-red-500">*</span> (có thể chọn nhiều)
          </label>
          <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto bg-gray-50">
            {authors && authors.length > 0 ? (
              <div className="space-y-2">
                {authors.map((a: any) => {
                  const authId = a.author_id || a.authorId || a.id;
                  const authIdStr = String(authId);

                  // Always check from state first
                  let isChecked = selectedAuthorIds.includes(authIdStr);

                  // Only fallback to existingAuthors if state is empty (initial load) and we're in edit mode
                  if (!isChecked && selectedAuthorIds.length === 0 && isEdit && existingAuthors && Array.isArray(existingAuthors)) {
                    isChecked = existingAuthors.some((ea: any) => {
                      const existingId = ea.author_id || ea.authorId || ea.id;
                      return String(existingId) === authIdStr;
                    });
                  }

                  return (
                    <label
                      key={authId}
                      className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleAuthorToggle(authIdStr)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-black select-none">{a.name}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Chưa có tác giả nào</p>
            )}
          </div>
          {selectedAuthorIds.length > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              Đã chọn {selectedAuthorIds.length} tác giả
            </p>
          )}
        </div>

        {/* PUBLISHER */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Nhà xuất bản <span className="text-red-500">*</span>
          </label>
          <select
            className="border border-gray-300 rounded w-full px-3 py-2 text-sm text-black bg-white"
            {...register("publisher_id", { required: true })}
          >
            <option value="">-- Chọn --</option>
            {publishers?.map((p: any) => (
              <option key={p.publisher_id} value={p.publisher_id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE & STOCK */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Giá <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm text-black bg-white"
              {...register("price", { required: true, valueAsNumber: true })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Tồn kho <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm text-black bg-white"
              {...register("stock_quantity", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        {/* DATE & LANGUAGE */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Ngày xuất bản
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm text-black bg-white"
              {...register("published_date")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Ngôn ngữ</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full px-3 py-2 text-sm text-black bg-white"
              {...register("language")}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Mô tả</label>
          <textarea
            className="border border-gray-300 rounded w-full px-3 py-2 text-sm text-black bg-white"
            rows={3}
            {...register("description")}
          />
        </div>

        {/* COVER IMAGE */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Ảnh bìa</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="border border-gray-300 rounded w-full px-3 py-2 text-sm text-black bg-white"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-40 object-cover rounded mt-2 shadow"
            />
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            {isEdit ? "Lưu thay đổi" : "Thêm mới"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/books")}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm"
          >
            Hủy
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdminBookForm;
