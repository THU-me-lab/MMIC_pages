# 04 Modeling&Feedback&ErrorAnalysis

## 误差分析

## $\lambda$ 型系统

$\lambda$ 型系统的传递函数一般可以写为

$$
G(s)=\frac{K \prod_k\left(c_i s+1\right) \prod_l\left(d_l^2 s^2+2 \zeta_l d_l s+1\right)}{s^\lambda \prod\left(a_i s+1\right) \prod\left(b_j^2 s^2+2 \zeta_j b_j s+1\right)}
$$

| system | Unit Step | Unit Ramp | Unit <br> Acceleration |
| :---: | :---: | :---: | :---: |
| 0-type | $\frac{1}{1+K_p}$ | $\infty$ | $\infty$ |
| I-type | 0 | $\frac{1}{K_v}$ | $\infty$ |
| II-type | 0 | 0 | $\frac{1}{K_a}$ |

With  

$$
K_{\mathrm{p}}=G(0) \quad K_{\mathrm{v}}=\lim _{s \rightarrow 0} s \cdot G(s) \quad K_{\mathrm{a}}=\lim _{s \rightarrow 0} s^2 \cdot G(s)
$$
