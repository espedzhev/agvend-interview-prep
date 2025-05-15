def read_lines(file) -> dict:
    data = {}

    for i, line in enumerate(file, 0):
        data[i] = [int(n) for n in line.strip().split(',')]

    return data

def main():
    with open('input.txt', 'r') as file:
        data = read_lines(file)

    with open('output.txt', 'w') as file:

        for i in range(0, len(data), 2):
            calculated_line = sum([i for i in data[i]]) + sum([i for i in data[i + 1]])

            file.write(str(calculated_line) + '\n')

    # print(data)


if __name__ == "__main__":
    main()
