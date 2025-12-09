from typing import List

class Matrix:

    # დატა უნდა იყოს ლსიტების ლისტი (2D): ინტეჯერ ლისტი ან ფლოუტ ლისტი, არ აბრუნებს არაფერს
    def __init__(self, data: List[List[int | float]]) -> None:
        # ჩეკავს დატა ანუ მატრიცა საერთოდ ლისტია თუ არა
        if not isinstance(data, list):
            raise TypeError(f"Expected 'data' to be a list")

        #ჩეკავს მატრიცა ცარიელია თუ არა რადგან data[0] მა ინდექს ერორი არ ამოაგდოს ქვედა კოდის გამო
        if len(data) == 0:  # სხვანაირად ეს შეილება ესე if not data:
            self.data = data
            #print("Empty Matrix object init successfully")
            return

        # ყოველთვის პირველი სტრიქონის სიგრძე არის შესადარებელი სიდიდე მატრიცის განზომილებისთვის
        expected_length = len(data[0])
        #ლუპავს მთლიან მატრიცაში და ნახულობს ყველა სტრიქონი ერთ სიგრძისაა თუ არა
        # და იმის მიხედვით შექმნის ობიექტს
        for l in range(len(data)):
            if len(data[l]) != expected_length:
                raise TypeError("Matrix Is Jagged")
        else:  # ეს ბლოკი მარტო იმ შემთხვევაში გაეშვება თუ ზედა ლუპი არ შეწყდება შუა პროცესში
            #print("Matrix Is NOT Jagged")
            self.data = data
            #print("Matrix object init successfully")

        self.shape = (len(data), len(data[0])) # 0 ასახავს ROW-ებს 1 ასახავს COLUMN-ებს

    # თვითონ მატრიცის სახე
    def __repr__(self):
        return str(self.data)

    # მატრიცის ტრანსპონირება -> ტრანსპონირებული მატრიცა
    def transpose(self):
        result_data = []
        # სტრიქონში ლუპი სვეტებში ჩადის
        for j in range(self.shape[1]):
            new_row = []
            # ლუპი რომელიც როუებში დადის
            for i in range(self.shape[0]):
                # სვეტების ციფრები ხდება სტრიქონების ციფრები და შექვაქ ახალ როუში
                result_val = self.data[i][j]
                new_row.append(result_val)
            result_data.append(new_row)
        return Matrix(result_data)

    # მატრიცის მინორი
    def minor(self, row_del, col_del):
        minor_data = []

        for i in range(self.shape[0]):
            new_row = []
            if i == row_del:
                continue
            for j in range(self.shape[1]):
                if j == col_del:
                    continue
                else:
                    result_val = self.data[i][j]
                    new_row.append(result_val)
            minor_data.append(new_row)
        return Matrix(minor_data)

    # მატრიცების დეტერმინანტის პოვნა
    def determinant(self):
        # მატრიცის განზომილების ჩეკი, ყველა მატრიცა უნდა იყოს კვადრატული
        if self.shape[0] != self.shape[1]:
            raise ValueError("Matrix is Not Square, can not calculate determinant")
        # 1x1 ზე მატრიცის ჩეკი
        if self.shape == (1,1):
            return self.data[0][0]

        # 2x2 მატრიცის დეტერმინანტი
        if self.shape == (2,2):
            return (self.data[0][0] * self.data[1][1] - self.data[0][1] * self.data[1][0])

        # 3x3 მატრიცის დეტერმინანტი: სამკუთხედის წესი
        if self.shape == (3,3):
            # მატრიცის მთავარი დიაგონალი და მისი პარალელები
            main_diagonal = self.data[0][0] * self.data[1][1] * self.data[2][2]
            triangle_m_diagonal = self.data[0][1] * self.data[1][2] * self.data[2][0]
            triangle_m_diagonal_reverse = self.data[1][0] * self.data[2][1] * self.data[0][2]

            # მატრიცის დამხმარე დიაგონალი და მისი პარალელები
            helper_diagonal = self.data[0][2] * self.data[1][1] * self.data[2][0]
            triangle_h_diagonal = self.data[0][1] * self.data[1][0] * self.data[2][2]
            triangle_h_diagonal_reverse = self.data[0][0] * self.data[1][2] * self.data[2][1]

            # სამკუთხედის წესით მატრიცის დეტერმინანტის დათვლა
            determinant3x3 = (main_diagonal + triangle_m_diagonal + triangle_m_diagonal_reverse -
                              helper_diagonal - triangle_h_diagonal - triangle_h_diagonal_reverse)

            return determinant3x3

        # ყველა დანარჩენი კვადრატული განზომილების მატრიცის დეტერმინანტი
        determinant = 0
        # ლუპი პირველ სტრიქონში სათითაო ციფრების საპოვნელად სვეტების მიხედვით
        for j in range(self.shape[1]):
            # პირველ სტრიქონში სათითაო ციფრი
            each_num = self.data[0][j]
            # პირველი რიგის გაშლის ხერხით პირველი სტრიქონის ამოშლა.
            # სადაც სტრიქონი (ROW) 0 ის ტოლია და j იმატებს სტრიქონის სიგრძის მიხედვით
            sub_matrix = self.minor(0,j)
            # ალგებრული დამატების ნიშანი, თუ ლუწია დადებითია თუ კენტი უარყოფიტი
            if j % 2 == 0:
                sign = 1
            else:
                sign = -1
            # დეტერმინანტის დათვლა ფორმულით det A = (-1)^ij * Mij
            determinant += sign * each_num * sub_matrix.determinant()

        return determinant

    # მატრიცების ჯამი
    def add(self, other_matrix):
        # მატრიცის განზომილების შედარება
        if self.shape != other_matrix.shape:
            raise ValueError("Dimensions do not match")

        #ცარიელი მასივი რაშიც შევინახავთ მთლიან დაჯამებულ მატრიცას
        result_data = []
        #სტრიქონების ლუპი, სვეტების ქველუპით, სათითაოდ ჯამები i,j ელემენტების სტრიქონებში
        #სტრიქონები ცარიელ დატა მასივში და ვაბრუნებთ მატრიცის ტიპის დატა ცვლადს
        for i in range(self.shape[0]):
            row = []
            for j in range(self.shape[1]):
                result_val = self.data[i][j] + other_matrix.data[i][j]
                row.append(result_val)
            result_data.append(row)
        return Matrix(result_data)

    # მატრიცების სხვაობა
    def subtract(self, other_matrix):
        # მატრიცის განზომილების შედარება
        if self.shape != other_matrix.shape:
            raise ValueError("Dimensions do not match")

        # ცარიელი მასივი რაშიც შევინახავთ მთლიან სხვაობას მატრიცებს შორის
        result_data = []
        # სტრიქონების ლუპი, სვეტების ქველუპით, სათითაო სხვაობა i,j ელემენტებს შორის სტრიქონებში
        # სტრიქონები ცარიელ დატა მასივში და ვაბრუნებთ მატრიცის ტიპის დატა ცვლადს
        for i in range(self.shape[0]):
            row = []
            for j in range(self.shape[1]):
                result_val = self.data[i][j] - other_matrix.data[i][j]
                row.append(result_val)
            result_data.append(row)
        return Matrix(result_data)

    # მატრიცების ნამრავლი
    def multiply(self, other_matrix):
        if self.shape[1] != other_matrix.shape[0]:
            raise ValueError("Dimensions do not match, Can not multiply matrix")
        result_data = []
        # სათითაო/თითოეული სტრიქონის ჯამური ლუპი
        for i in range(self.shape[0]):
            row = []
            # თითოეულ სტრიქონში ჯამი მთლიანი სვეტების
            for j in range(other_matrix.shape[1]):
                current_sum = 0
                #თითოეული მატრიცის i,j ინდექსის ჯამი
                for k in range(self.shape[1]):
                    current_sum += self.data[i][k] * other_matrix.data[k][j]
                row.append(current_sum)
            result_data.append(row)
        return Matrix(result_data)

    # მატრიცის გამრავლება მუდმივ ციფრზე/რიცხვზე
    def scalar_multiply(self, number):
        result_data = []
        # ლუპი სტრიქონებში
        for i in range(self.shape[0]):
            new_row = []
            # ლუპი სვეტებში
            for j in range(self.shape[1]):
                # ნამრავლი i,j ელემენტების მუდმივ ციფრზე / რიცხვზე
                scalar = self.data[i][j] * number
                new_row.append(scalar)
            # სტრიქონებად აწყობა ახალი მატრიცის
            result_data.append(new_row)

        return Matrix(result_data)

    # მიკავშირებული მატრიცა -> მატრიცის მიკავშირებულის პოვნა
    def adjugate(self):
        co_data = []
        # ლუპი სტრიქონებში
        for i in range(self.shape[0]):
            new_row = []
            # ლუპი სვეტებში
            for j in range(self.shape[1]):
                # მინორების პოვნა
                sub_matrix = self.minor(i, j)
                # მინორის ალგებრული დამატება / დეტერმინანტი
                sub_determinant = sub_matrix.determinant()
                if (i+j) % 2 == 0:
                    sign = 1
                else:
                    sign = -1
                # ალგებრული დამატება სწორი ნიშნით შედეგბში, და შედეგი სტრიქონში, სტრიქონი ახალ მატრიცის დატაში
                result_val = sub_determinant * sign
                new_row.append(result_val)
            # ახალი მატრიცის დატაში სატითაოდ სტრიქონი
            co_data.append(new_row)

        # ახალი მატრიცა
        new_matrix = Matrix(co_data)

        return new_matrix.transpose()

    # მატრიცის შებრუნება -> შებრუნებული მატრიცა
    def inverse(self):
        # A^-1 = ( 1 / det(A) ) * adj(A)

        determinant = self.determinant()
        if determinant == 0:
            raise ValueError("Determinant is zero, can not inverse Matrix")
        else:
            adj = self.adjugate()
            A_inverse = adj.scalar_multiply(1/determinant)

        return A_inverse


if __name__ == "__main__":

    # emtpy_matrix = Matrix([])
    #
    # matrix1x1 = Matrix([[8]])
    #
    # matrix2x2 = Matrix([[1,2], [3,4]])

    # matrix_rand2x3 = Matrix([[1, 2], [4, 5], [8, 9]])

    matrix3x3 = Matrix([[1,2,3],[4,5,6],[7,8,9]])

    matrix4x4 = Matrix([[1,2,3,4],
                        [5,6,7,0],
                        [9,10,3,10],
                        [-1,11,4,8]
                        ])

    print(matrix3x3.determinant())
    print(matrix4x4.determinant())
    # print(matrix4x4.inverse())
    # print(matrix3x3.inverse())


