package Task19;

public class storage<T> {
    private T[] array;
    public storage(int size) {
        this.array = (T[]) new Object[size];
    }

        public void setElement(int index, T value) {
            array[index] = value;
        }

        public T getElement(int index) {
            return array[index];
        }

        public int getSize() {
            return array.length;
        }
        public String toString(){
            for(int i =0; i< array.length;i++){
                System.out.println(array[i]);
            }
            return null;
        }

        public static void main(String[] args) {
            // Пример использования
            storage<Integer> intArray = new storage<>(5);
            intArray.setElement(0, 1);
            intArray.setElement(1, 2);
            intArray.setElement(2, 3);

            System.out.println("Элемент 1: " + intArray.getElement(1));
            intArray.toString();

            storage<String> stringArray = new storage<>(3);
            stringArray.setElement(0, "Hello");
            stringArray.setElement(1, "World");

            System.out.println("Элемент 0: " + stringArray.getElement(0));
            stringArray.toString();
        }
    }
