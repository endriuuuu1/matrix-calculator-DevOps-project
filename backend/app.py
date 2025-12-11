from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from matrix import Matrix
import sys
import os
sys.path.append(os.getcwd())



app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Matrix API is Running"

@app.route('/api/calculate', methods=['POST'])
def calculate():
    # {
    # operation: "operation"
    # matrix_a: "[[]]"
    # matrix_b: "[[]]"
    # }


    data = request.get_json()

    if not data:
        return jsonify({"error": "Missing matrix data, No data at all"}), 400

    # ამოვიღოთ მოსული json იდან ოპერაცია
    operation = data.get('operation')

    # ამოვიღოთ მოსული json იდან მატრიცები a და b
    raw_matrix_a = data.get('matrix_a')
    raw_matrix_b = data.get('matrix_b')

    # მატრიცის ოპერაციების ლისტი: შემთხვევა როდესაც ორივე მატრიცა საჭიროა
    double_operation_list = ['add', 'subtract', 'multiply']
    single_operation_list = ['inverse', 'determinant', 'transpose', 'scalar_multiply']

    def is_valid_matrix(matrix):
        # აბრუნებს True-ს თუ საერთოდ არსებობს AND(და) არის ცარიელი (>0)
        return matrix is not None and len(matrix) > 0

    try:
        result_data = None

        # ჩეკი: სიტუაცია სადაც ორივე მატრიცა საჭიროა
        if operation in double_operation_list:
            if not is_valid_matrix(raw_matrix_a) or not is_valid_matrix(raw_matrix_b):
                return jsonify({"error": f"Operation: '{operation}' requires Both Matrix A and B"}), 400

            matrix_a = Matrix(raw_matrix_a)
            matrix_b = Matrix(raw_matrix_b)

            # 2 მატრიცოვანი ოპერაციების ქეისები
            match operation:
                case "add":
                    result_data = matrix_a.add(matrix_b).data
                    operation = "Addition"
                case "subtract":
                    result_data = matrix_a.subtract(matrix_b).data
                    operation = "Subtraction"
                case "multiply":
                    result_data = matrix_a.multiply(matrix_b).data
                    operation = "Multiplication"

            # if operation == "add":
            #     result_data = matrix_a.add(matrix_b)
            # elif operation == "subtract":
            #     result_data = matrix_a.subtract(matrix_b)
            # elif operation == "multiply":
            #     result_data = matrix_a.multiply(matrix_b)

        # ჩეკი: სიტუაცია სადაც ერთი მატრიცაა მარტო საჭირო
        elif operation in single_operation_list:

            single_matrix = None
            used_matrix = None

            # ჩეკავს პირველი და მეორემატრცია ვალიდურია თუ არა
            if is_valid_matrix(raw_matrix_a):
                single_matrix = Matrix(raw_matrix_a)
                used_matrix = "matrix_a"
            elif is_valid_matrix(raw_matrix_b):
                single_matrix = Matrix(raw_matrix_b)
                used_matrix = "matrix_b"
            else:
                # თუ არცერთი მატრიცა არაა შევსებული და ცარიელია აბრუნებს ერორს
                return jsonify({"error": "Please fill at least one matrix"}), 400


            match operation:
                case "scalar_multiply":
                    value = data.get('scalar_num')
                    if value is None or value == "":
                        scalar_num = 1
                        operation = "Scalar Multiplication"
                    else:
                        scalar_num = value
                        operation = "Scalar Multiplication"
                    result_data = single_matrix.scalar_multiply(scalar_num).data
                case "transpose":
                    result_data = single_matrix.transpose().data
                    operation = operation.title()
                case "inverse":
                    result_data = single_matrix.inverse().data
                    operation = operation.title()
                case "determinant":
                    result_data = single_matrix.determinant()
                    operation = operation.title()

        # ყველა დანარჩენ არარსებულ ოპერაციების შემთხვევებში
        else:
            return jsonify({"error": f"Unknown operation: {operation}"}), 400


        # ვაბრუნებთ მთელ ზედა ოპერაციებს json ფორმატში სტატუუს,
        # ოპერაციას რომელიც შესრულდა
        # და თვითონ მატრიცის დატას
        return jsonify({
            "status": "success",
            "operation": operation,
            "matrix_used": used_matrix,
            "result": result_data,
        })

    except ValueError as e:
        # იჭერს ლოგიკურ მატრიცულ ერორებს რომელიც მოდის matrix.py-დან
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        # იჭერს სერვერ ერორებს / ქრაშებს
        return jsonify({"error": "Server Error"}), 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)