import java.util.InputMismatchException;
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Combien de fournisseurs voulez-vous ajouter ");
        int n = sc.nextInt();
        sc.nextLine();
        for (int i = 0; i < n; i++) {
            Fournisseur.ajouterFournisseur();
        }
        System.out.println("--------------------------------------------------- ");
        System.out.println("Liste de tous les fournisseurs : ");
        Fournisseur.afficherFournisseur();

        System.out.println("-------------------------------------------- ");

        System.out.println("Liste des fournisseurs ayant un compte gmail: ");
        Fournisseur.afficherGmail();

        System.out.println("--------------------------------------------------- ");

        System.out.println("Liste des fournisseurs nationaux : ");
        Fournisseur.afficherFourNat();
    }
}
