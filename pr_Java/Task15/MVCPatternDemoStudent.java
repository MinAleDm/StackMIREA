package Task15;

public class MVCPatternDemoStudent {
    public static void main(String[] args){
        Student model = retriveStudentFromDa();
        StudentView view = new StudentView();
        StudentController controller = new StudentController(model, view);
        controller.updateView();
        controller.setStudentRollNo("01");
        System.out.println("--------------------------");
        controller.updateView();
    }
    private static Student retriveStudentFromDa() {
        Student student = new Student();
        student.setName("Николай");
        student.setRollNo("09");
        return student;
    }
}
