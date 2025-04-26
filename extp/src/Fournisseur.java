import java.util.ArrayList;
import java.util.Scanner;

class Fournisseur {
    private String nom;
    private String email;
    private Pays pays;

    private static ArrayList<Fournisseur> fournisseurs = new ArrayList<>();

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public Pays getPays() {
        return pays;
    }

    public static ArrayList<Fournisseur> getFournisseurs() {
        return fournisseurs;
    }

    public static void setFournisseurs(ArrayList<Fournisseur> fournisseurs) {
        Fournisseur.fournisseurs = fournisseurs;
    }

    public void setPays(Pays pays) {
        this.pays = pays;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Fournisseur(String nom, String email, Pays pays) {
        this.nom = nom;
        this.email = email;
        this.pays = pays;
    }

    public static boolean verifierNom(String nom) {
        return nom.length() >= 3;
    }

    public static void ajouterFournisseur() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Nom : ");
        String nom = sc.nextLine();
        while (!verifierNom(nom)) {
            System.out.println(" au min 3 caracteres .");
            System.out.print("Nom : ");
            nom = sc.nextLine();
        }
        System.out.print("Email : ");
        String email = sc.nextLine();
        System.out.print("ID du pays : ");
        int id = sc.nextInt();
        sc.nextLine();
        System.out.print("Nom du pays : ");
        String nom_pays = sc.nextLine();
        Pays pays = new Pays(id, nom_pays);
        Fournisseur f = new Fournisseur(nom, email, pays);
        fournisseurs.add(f);
    }

    public static void afficherFournisseur() {
        for (Fournisseur f : fournisseurs) {
            System.out.println("Nom: " + f.nom + "/ Email: " + f.email + "/ Pays: " + f.pays.nom_pays);
        }
    }

    public static void afficherGmail() {
        for (Fournisseur f : fournisseurs) {
            if (f.email.toLowerCase().endsWith("@gmail.com")) {
                System.out.println("Nom: " + f.nom + "/ Email: " + f.email + "/ Pays: " + f.pays.nom_pays);
            }
        }
    }

    public static void afficherFourNat() {
        for (Fournisseur f : fournisseurs) {
            if (f.pays.nom_pays.equalsIgnoreCase("tunisie")) {
                System.out.println("Nom: " + f.nom + "/ Email: " + f.email + "/ Pays: " + f.pays.nom_pays);
            }
        }
    }
}