import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Usar backend não-interativo
import matplotlib.pyplot as plt

# Carregar o arquivo
df = pd.read_excel('default_of_credit_card_clients__courseware_version_1_21_19 (1).xls')

print("=" * 80)
print("ANÁLISE DE CARACTERÍSTICAS FINANCEIRAS")
print("=" * 80)

# EXERCÍCIO 1: Criar listas com nomes para as características financeiras
print("\n### EXERCÍCIO 1: Listas com nomes das características financeiras ###\n")

bill_features = ['BILL_AMT1', 'BILL_AMT2', 'BILL_AMT3', 'BILL_AMT4', 'BILL_AMT5', 'BILL_AMT6']
pay_features = ['PAY_AMT1', 'PAY_AMT2', 'PAY_AMT3', 'PAY_AMT4', 'PAY_AMT5', 'PAY_AMT6']

print(f"Características de Valor da Fatura: {bill_features}")
print(f"Características de Valor do Pagamento: {pay_features}")

# EXERCÍCIO 2: Use .describe() para examinar características de valor da fatura
print("\n### EXERCÍCIO 2: Resumo estatístico das características de valor da fatura ###\n")
bill_describe = df[bill_features].describe()
print(bill_describe)
print("\n📊 Análise: ")
print("- Observe a grande diferença entre min e max (escala muito grande)")
print("- A média é significativamente maior que a mediana (distribuição assimétrica)")
print("- Isso sugere presença de outliers e distribuição não-normal")

# EXERCÍCIO 3: Visualizar características de valor da fatura em histogramas 2x3
print("\n### EXERCÍCIO 3: Histogramas de características de valor da fatura (2x3) ###\n")

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes = axes.flatten()

for i, feature in enumerate(bill_features):
    axes[i].hist(df[feature], bins=20, color='skyblue', edgecolor='black')
    axes[i].set_title(f'{feature}')
    axes[i].set_xlabel('Valor (R$)')
    axes[i].set_ylabel('Frequência')
    axes[i].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('histogramas_bill_amounts.png', dpi=300, bbox_inches='tight')
print("✅ Gráfico salvo como 'histogramas_bill_amounts.png'")
plt.close()

# EXERCÍCIO 4: Resumo estatístico das características de valor do pagamento
print("\n### EXERCÍCIO 4: Resumo estatístico das características de valor do pagamento ###\n")
pay_describe = df[pay_features].describe()
print(pay_describe)
print("\n📊 Análise: ")
print("- Muitos pagamentos com valor 0 (clientes que não pagaram)")
print("- Grande variação nos valores de pagamento")
print("- Distribuição assimétrica semelhante aos valores de fatura")

# EXERCÍCIO 5: Histogramas de características de pagamento 2x3 com rotação
print("\n### EXERCÍCIO 5: Histogramas de características de pagamento (2x3) com rotação ###\n")

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes = axes.flatten()

for i, feature in enumerate(pay_features):
    axes[i].hist(df[feature], bins=20, color='lightcoral', edgecolor='black')
    axes[i].set_title(f'{feature}')
    axes[i].set_xlabel('Valor (R$)')
    axes[i].set_ylabel('Frequência')
    axes[i].tick_params(axis='x', rotation=45)
    axes[i].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('histogramas_pay_amounts.png', dpi=300, bbox_inches='tight')
print("✅ Gráfico salvo como 'histogramas_pay_amounts.png'")
plt.close()

# EXERCÍCIO 6: Máscara booleana para contar pagamentos iguais a 0
print("\n### EXERCÍCIO 6: Contagem de pagamentos iguais a 0 ###\n")

for feature in pay_features:
    count_zero = (df[feature] == 0).sum()
    percentage = (count_zero / len(df)) * 100
    print(f"{feature}: {count_zero} valores iguais a 0 ({percentage:.2f}%)")

total_zero_payments = sum((df[feature] == 0).sum() for feature in pay_features)
total_records = len(df) * len(pay_features)
print(f"\nTotal de zeros em todos os pagamentos: {total_zero_payments} de {total_records} ({(total_zero_payments/total_records)*100:.2f}%)")
print("\n📊 Análise: A alta quantidade de zeros faz sentido - muitos clientes não fazem pagamentos em determinados meses")

# EXERCÍCIO 7: Transformações logarítmicas de pagamentos não-zero
print("\n### EXERCÍCIO 7: Histogramas de transformações logarítmicas (PAY_AMT != 0) ###\n")

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes = axes.flatten()

for i, feature in enumerate(pay_features):
    # Filtrar pagamentos diferentes de zero
    non_zero_payments = df[df[feature] > 0][feature]
    
    # Aplicar log10
    log_payments = non_zero_payments.apply(np.log10)
    
    axes[i].hist(log_payments, bins=20, color='lightgreen', edgecolor='black')
    axes[i].set_title(f'log10({feature})')
    axes[i].set_xlabel('log10(Valor em R$)')
    axes[i].set_ylabel('Frequência')
    axes[i].tick_params(axis='x', rotation=45)
    axes[i].grid(True, alpha=0.3)
    
    print(f"{feature} (não-zero):")
    print(f"  - Contagem: {len(non_zero_payments)}")
    print(f"  - Min log10: {log_payments.min():.2f}")
    print(f"  - Max log10: {log_payments.max():.2f}")
    print(f"  - Média log10: {log_payments.mean():.2f}")

plt.tight_layout()
plt.savefig('histogramas_log_pay_amounts.png', dpi=300, bbox_inches='tight')
print("\n✅ Gráfico salvo como 'histogramas_log_pay_amounts.png'")
plt.close()

print("\n" + "=" * 80)
print("✅ ANÁLISE CONCLUÍDA COM SUCESSO!")
print("=" * 80)
